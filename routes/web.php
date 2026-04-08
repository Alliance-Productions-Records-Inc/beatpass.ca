<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

// RSS feed proxy helper
function fetchRssFeed($feedUrl) {
    $context = stream_context_create([
        'http' => [
            'timeout' => 10,
            'user_agent' => 'Mozilla/5.0 (compatible; BeatPass/1.0)'
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false
        ]
    ]);
    
    return @file_get_contents($feedUrl, false, $context);
}

// YouTube RSS feed proxy
Route::get('/api/youtube-feed', function () {
    try {
        $xml = fetchRssFeed('https://www.youtube.com/feeds/videos.xml?channel_id=UCy3ohTlamVHmfcvt6LJqSJw');
        
        if ($xml !== false) {
            return response($xml, 200)
                ->header('Content-Type', 'application/xml')
                ->header('Cache-Control', 'public, max-age=3600');
        }
        
        return response()->json(['error' => 'Failed to fetch feed'], 500);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Blog RSS feed proxy (articles only, excludes beat showcase / video posts)
Route::get('/api/blog-feed', function () {
    try {
        $xml = fetchRssFeed('https://blog.beatpass.ca/tag/articles/rss/');
        
        if ($xml !== false) {
            return response($xml, 200)
                ->header('Content-Type', 'application/xml')
                ->header('Cache-Control', 'public, max-age=3600');
        }
        
        return response()->json(['error' => 'Failed to fetch feed'], 500);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});
