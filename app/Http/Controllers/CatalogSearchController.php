<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

/** Anonymous, read-only adapter for the player's public autocomplete API. */
class CatalogSearchController
{
    public function __invoke(Request $request)
    {
        $request->validate(['query' => 'nullable|string|max:120']);
        $query = trim((string) $request->query('query', ''));
        if (mb_strlen($query) < 3) {
            return response()->json(['query' => $query, 'results' => []]);
        }

        try {
            $results = Cache::remember('landing-search:' . hash('sha256', $query), 30, function () use ($query) {
                $context = stream_context_create([
                    'http' => [
                        'timeout' => 5,
                        'follow_location' => 0,
                        'header' => "Accept: application/json\r\nUser-Agent: BeatPassLanding/1.0 (+https://beatpass.ca)\r\n",
                    ],
                    'ssl' => ['verify_peer' => true, 'verify_peer_name' => true],
                ]);
                // The host/path and loader are fixed; visitor input is only an encoded query value.
                $url = 'https://open.beatpass.ca/api/v1/search?' . http_build_query(['loader' => 'search', 'query' => $query]);
                $body = @file_get_contents($url, false, $context, 0, 262144);
                if ($body === false) {
                    throw new \RuntimeException('Public catalog unavailable');
                }
                $payload = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
                if (!isset($payload['results']) || !is_array($payload['results'])) {
                    throw new \RuntimeException('Invalid catalog response');
                }

                $items = [];
                $groups = ['tracks' => 'track', 'artists' => 'artist', 'albums' => 'album', 'playlists' => 'playlist', 'tags' => 'tag'];
                foreach ($groups as $group => $kind) {
                    foreach (array_slice($payload['results'][$group] ?? [], 0, 3) as $item) {
                        $title = $item['display_name'] ?? $item['name'] ?? null;
                        if (!is_string($title) || $title === '' || !isset($item['id'])) continue;
                        $name = (string) ($item['name'] ?? $title);
                        $href = $kind === 'tag'
                            ? '/tag/' . rawurlencode($name)
                            : '/' . $kind . '/' . (int) $item['id'] . '/' . rawurlencode(Str::slug($name));
                        $artists = array_filter(array_map(fn ($artist) => is_string($artist['name'] ?? null) ? $artist['name'] : null, $item['artists'] ?? []));
                        $image = $item['image'] ?? $item['image_small'] ?? null;
                        if (!is_string($image) || !str_starts_with($image, 'https://')) $image = null;
                        $items[] = [
                            'id' => $kind . '-' . (int) $item['id'],
                            'kind' => $kind,
                            'title' => Str::limit(html_entity_decode($title, ENT_QUOTES | ENT_HTML5, 'UTF-8'), 160),
                            'description' => Str::limit(implode(', ', $artists), 160),
                            'image' => $image,
                            'href' => 'https://open.beatpass.ca' . $href,
                        ];
                    }
                }
                return $items;
            });
            return response()->json(['query' => $query, 'results' => $results])
                ->header('Cache-Control', 'private, max-age=0');
        } catch (\Throwable $error) {
            return response()->json(['error' => 'Search is temporarily unavailable.'], 502);
        }
    }
}
