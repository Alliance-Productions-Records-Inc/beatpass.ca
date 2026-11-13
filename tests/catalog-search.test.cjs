const { spawnSync } = require('node:child_process');
const assert = require('node:assert/strict');
const test = require('node:test');
const path = require('node:path');

// Run the real controller with Laravel validation and an isolated array cache.
// Only the fixed upstream transport is replaced; no network or production cache writes.
const php = String.raw`
namespace App\Http\Controllers {
    function file_get_contents($url, $useIncludePath, $context, $offset, $length) {
        $GLOBALS['calls'][] = ['url' => $url, 'context' => stream_context_get_options($context), 'limit' => $length];
        return $GLOBALS['upstream'];
    }
}
namespace {
    require 'vendor/autoload.php';
    $app = require 'bootstrap/app.php';
    $app->afterBootstrapping(\Illuminate\Foundation\Bootstrap\LoadConfiguration::class, function ($app) {
        $app['config']->set('cache.default', 'array');
        $app['config']->set('cache.stores.array', ['driver' => 'array', 'serialize' => false]);
        $app['config']->set('app.key', 'base64:' . base64_encode(str_repeat('x', 32)));
        $app['config']->set('session.driver', 'array');
    });
    $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    $controller = new \App\Http\Controllers\CatalogSearchController();
    function runCase($query, $upstream) {
        \Illuminate\Support\Facades\Cache::store('array')->flush();
        $GLOBALS['calls'] = [];
        $GLOBALS['upstream'] = $upstream;
        try {
            $request = \Illuminate\Http\Request::create('/api/search', 'GET', ['query' => $query]);
            $response = (new \App\Http\Controllers\CatalogSearchController())($request);
            return ['status' => $response->getStatusCode(), 'body' => $response->getData(true), 'calls' => $GLOBALS['calls']];
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ['status' => 422, 'errors' => array_keys($e->errors()), 'calls' => $GLOBALS['calls']];
        }
    }
    $rows = [];
    for ($i = 1; $i <= 5; $i++) $rows[] = ['id' => $i, 'name' => 'A &amp; B / 東京', 'image' => 'javascript:alert(1)', 'src' => 'private-audio', 'email' => 'fixture@example.invalid', 'artists' => [['name' => 'Fixture producer']]];
    $payload = json_encode(['results' => ['tracks' => $rows, 'users' => $rows, 'tags' => [['id' => 8, 'name' => 'été / 東京?', 'display_name' => 'Été']]]]);
    $result = [
        'short' => runCase('  ab  ', false),
        'array' => runCase(['invalid'], false),
        'long' => runCase(str_repeat('x', 121), false),
        'normal' => runCase('  été / 東京? #100%  ', $payload),
        'network' => runCase('echo', false),
        'malformed' => runCase('echo', '{'),
        'invalid' => runCase('echo', '{}'),
    ];
    $GLOBALS['calls'] = [];
    $GLOBALS['upstream'] = $payload;
    \Illuminate\Support\Facades\Cache::store('array')->flush();
    $request = \Illuminate\Http\Request::create('/api/search', 'GET', ['query' => 'cache-fixture']);
    $controller($request); $controller($request);
    $result['cacheCalls'] = count($GLOBALS['calls']);
    $kernel = $app->make(\Illuminate\Contracts\Http\Kernel::class);
    $short = \Illuminate\Http\Request::create('/api/search', 'GET', ['query' => 'ab'], [], [], ['HTTP_ACCEPT' => 'application/json']);
    $response = $kernel->handle($short);
    $result['httpStatus'] = $response->getStatusCode();
    $result['httpCookies'] = count($response->headers->getCookies());
    echo json_encode($result, JSON_THROW_ON_ERROR);
}
`;
const process = spawnSync('php', ['-r', php], { cwd: path.resolve(__dirname, '..'), encoding: 'utf8' });
assert.equal(process.status, 0, process.stderr || process.stdout);
const result = JSON.parse(process.stdout);

test('autocomplete validates bounds and does not contact the app for short/invalid input', () => {
  assert.equal(result.short.status, 200);
  assert.deepEqual(result.short.body.results, []);
  for (const name of ['short', 'array', 'long']) assert.equal(result[name].calls.length, 0);
  assert.equal(result.array.status, 422);
  assert.equal(result.long.status, 422);
});

test('autocomplete uses a fixed anonymous upstream with encoded Unicode and verified TLS', () => {
  const call = result.normal.calls[0], url = new URL(call.url);
  assert.equal(url.origin, 'https://open.beatpass.ca');
  assert.equal(url.pathname, '/api/v1/search');
  assert.equal(url.searchParams.get('loader'), 'search');
  assert.equal(url.searchParams.get('query'), 'été / 東京? #100%');
  assert.equal(call.context.ssl.verify_peer, true);
  assert.equal(call.context.ssl.verify_peer_name, true);
  assert.equal(call.context.http.follow_location, 0);
  assert.ok(!/cookie:|authorization:/i.test(call.context.http.header));
});

test('autocomplete only returns bounded public display fields and app-owned destination URLs', () => {
  assert.equal(result.normal.status, 200);
  const items = result.normal.body.results;
  assert.equal(items.length, 4);
  assert.equal(items[0].title, 'A & B / 東京');
  assert.equal(items[0].description, 'Fixture producer');
  assert.equal(items[0].image, null);
  assert.ok(!JSON.stringify(items).includes('fixture@example.invalid'));
  assert.ok(!JSON.stringify(items).includes('private-audio'));
  for (const item of items) assert.equal(new URL(item.href).origin, 'https://open.beatpass.ca');
  assert.equal(decodeURIComponent(new URL(items[3].href).pathname.slice('/tag/'.length)), 'été / 東京?');
});

test('upstream failures remain errors and successful anonymous responses have a short cache', () => {
  for (const name of ['network', 'malformed', 'invalid']) {
    assert.equal(result[name].status, 502);
    assert.ok(result[name].body.error);
  }
  assert.equal(result.cacheCalls, 1);
});

test('the real anonymous HTTP route does not require an authentication guard', () => {
  assert.equal(result.httpStatus, 200);
  assert.equal(result.httpCookies, 0);
});
