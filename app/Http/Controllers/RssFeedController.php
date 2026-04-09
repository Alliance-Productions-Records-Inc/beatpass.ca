<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;

class RssFeedController
{
    public function proxy(string $feedUrl)
    {
        try {
            $xml = $this->fetchRssFeed($feedUrl);

            if ($xml !== false) {
                return response($xml, 200)
                    ->header('Content-Type', 'application/xml')
                    ->header('Cache-Control', 'public, max-age=3600');
            }

            return response()->json(['error' => 'Failed to fetch feed'], 502);
        } catch (\Exception $e) {
            Log::error($e);

            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    private function fetchRssFeed(string $feedUrl): string|false
    {
        $context = stream_context_create([
            'http' => [
                'timeout' => 10,
                'user_agent' => 'Mozilla/5.0 (compatible; BeatPass/1.0)',
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
            ],
        ]);

        return @file_get_contents($feedUrl, false, $context);
    }
}
