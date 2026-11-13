<?php

use App\Http\Controllers\RssFeedController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app', ['page' => 'landing']);
});

// Public, anonymous catalog autocomplete; never forwards visitor credentials.
Route::get('/api/search', \App\Http\Controllers\CatalogSearchController::class)
    ->middleware('throttle:landing-search')
    ->withoutMiddleware([
        \Illuminate\Cookie\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
    ]);

// YouTube RSS feed proxy
Route::get('/api/youtube-feed', fn () => app(RssFeedController::class)->proxy('https://www.youtube.com/feeds/videos.xml?channel_id=UCy3ohTlamVHmfcvt6LJqSJw'));

// Blog RSS feed proxy (articles only, excludes beat showcase / video posts)
Route::get('/api/blog-feed', fn () => app(RssFeedController::class)->proxy('https://blog.beatpass.ca/tag/articles/rss/'));

// Changelog RSS feed proxy
Route::get('/api/changelog-feed', fn () => app(RssFeedController::class)->proxy('https://docs.beatpass.ca/release-notes/changelog/rss.xml'));

// SPA catch-all (must be last)
Route::get('/changelog', function () {
    return view('app', ['page' => 'changelog']);
});
