const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, '../resources/js/utils/analytics.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;
const fields = ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization'];
const settings = (value) => Object.fromEntries(fields.map((field) => [field, value]));

function harness({ cookies = [], hostname = 'beatpass.ca', pathname = '/' } = {}) {
  const jar = cookies.map((cookie) => ({ path: '/', domain: '.beatpass.ca', ...cookie }));
  const writes = [];
  const listeners = {};
  const scripts = [];
  let reloads = 0;
  const location = {
    protocol: 'https:', hostname, pathname, search: '',
    get origin() { return `https://${this.hostname}`; },
    reload() { reloads++; },
  };
  const document = {
    title: 'BeatPass', referrer: 'https://example.org/',
    get cookie() {
      return jar.filter((cookie) => {
        const domain = cookie.domain.replace(/^\./, '');
        return (cookie.hostOnly ? location.hostname === domain :
          location.hostname === domain || location.hostname.endsWith(`.${domain}`)) &&
          location.pathname.startsWith(cookie.path);
      }).map(({ name, value }) => `${name}=${value}`).join('; ');
    },
    set cookie(value) {
      writes.push(value);
      const [pair, ...attributes] = value.split(';').map((part) => part.trim());
      const [name, content] = pair.split('=');
      const attrs = Object.fromEntries(attributes.map((attribute) => {
        const index = attribute.indexOf('=');
        return index < 0 ? [attribute.toLowerCase(), true] :
          [attribute.slice(0, index).toLowerCase(), attribute.slice(index + 1)];
      }));
      const domain = (attrs.domain || location.hostname).replace(/^\./, '');
      const hostOnly = !attrs.domain;
      const cookiePath = attrs.path || '/';
      const index = jar.findIndex((cookie) => cookie.name === name &&
        cookie.domain.replace(/^\./, '') === domain && !!cookie.hostOnly === hostOnly && cookie.path === cookiePath);
      if (index >= 0) jar.splice(index, 1);
      if (attrs['max-age'] !== '0') jar.push({ name, value: content, domain, hostOnly, path: cookiePath });
    },
    createElement: () => ({}),
    head: { appendChild(script) { scripts.push({ ...script, commands: commands() }); } },
  };
  const updateUrl = (url) => {
    if (!url) return;
    const next = new URL(url, location.origin + location.pathname + location.search);
    location.pathname = next.pathname;
    location.search = next.search;
  };
  const window = {
    location,
    history: { pushState: (_, __, url) => updateUrl(url), replaceState: (_, __, url) => updateUrl(url) },
    addEventListener(name, handler) { listeners[name] = handler; },
  };
  const commands = () => JSON.parse(JSON.stringify((window.dataLayer || []).map((entry) => Array.from(entry))));
  const exports = {};
  vm.runInNewContext(source, { exports, window, document, URL, Date, Set, queueMicrotask });
  return { ...exports, window, document, jar, writes, scripts, listeners, commands,
    get reloads() { return reloads; } };
}

test('fresh visit sets all defaults denied before tag loading, with one landing pageview and no cookie writes', () => {
  const app = harness();
  app.initializeAnalytics();
  assert.deepEqual(app.commands()[0], ['consent', 'default', settings('denied')]);
  assert.equal(app.readConsent(), null);
  assert.deepEqual(app.writes, []);
  assert.equal(app.scripts.length, 1);
  assert.equal(app.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-5K99X60DF6');
  assert.deepEqual(app.scripts[0].commands[0], app.commands()[0]);
  const config = app.commands().find(([command]) => command === 'config');
  assert.equal(config[2].send_page_view, false);
  assert.equal(config[2].content_group, 'landing');
  const views = app.commands().filter((entry) => entry[1] === 'page_view');
  assert.equal(views.length, 1);
  assert.equal(views[0][2].content_group, 'landing');
});

test('shared granted choice is applied before config and the first pageview', () => {
  const app = harness({ cookies: [{ name: 'bp_consent', value: 'granted' }] });
  app.initializeAnalytics();
  assert.deepEqual(app.commands()[1], ['consent', 'update', settings('granted')]);
  assert.equal(app.readConsent(), 'granted');
  assert.equal(app.writes.length, 0);
});

test('shared denied choice clears stale GA cookies and never grants consent', () => {
  const app = harness({ cookies: [
    { name: 'bp_consent', value: 'denied' }, { name: '_ga', value: 'old-id' },
  ] });
  app.initializeAnalytics();
  assert.equal(app.readConsent(), 'denied');
  assert.ok(!app.document.cookie.includes('_ga='));
  assert.ok(!app.commands().some((entry) => entry[1] === 'update'));
});

test('Accept persists the exact shared cookie attributes and grants all four fields', () => {
  const app = harness();
  app.initializeAnalytics();
  app.saveConsent('granted');
  assert.equal(app.readConsent(), 'granted');
  const cookie = app.writes.find((value) => value.startsWith('bp_consent='));
  assert.match(cookie, /bp_consent=granted; Domain=\.beatpass\.ca; Path=\/; SameSite=Lax; Expires=.+; Secure$/);
  const expiry = new Date(cookie.match(/Expires=([^;]+)/)[1]);
  const expected = new Date();
  expected.setUTCMonth(expected.getUTCMonth() + 6);
  assert.ok(Math.abs(expiry - expected) < 2000);
  assert.deepEqual(app.commands().at(-1), ['consent', 'update', settings('granted')]);
  assert.equal(app.reloads, 0);
  app.window.location.hostname = 'open.beatpass.ca';
  assert.equal(app.readConsent(), 'granted', 'shared cookie is readable on another subdomain');
});

test('Refuse after Accept clears host/domain/path GA cookies, preserves unrelated cookies, and reloads', () => {
  const app = harness({ hostname: 'www.beatpass.ca', pathname: '/changelog' });
  app.initializeAnalytics();
  app.saveConsent('granted');
  app.jar.push(
    { name: '_ga', value: 'domain-id', domain: '.beatpass.ca', path: '/' },
    { name: '_ga_5K99X60DF6', value: 'session', domain: 'www.beatpass.ca', hostOnly: true, path: '/' },
    { name: '_gid', value: 'legacy', domain: '.beatpass.ca', path: '/changelog' },
    { name: 'theme', value: 'dark', domain: '.beatpass.ca', path: '/' },
  );
  app.saveConsent('denied');
  assert.equal(app.readConsent(), 'denied');
  assert.ok(!app.document.cookie.includes('_ga'));
  assert.ok(!app.document.cookie.includes('_gid'));
  assert.ok(app.document.cookie.includes('theme=dark'));
  assert.deepEqual(app.commands().at(-1), ['consent', 'update', settings('denied')]);
  assert.equal(app.reloads, 1);
});

test('initial refusal stays denied, persists the choice, and needs no reload', () => {
  const app = harness();
  app.initializeAnalytics();
  app.saveConsent('denied');
  assert.equal(app.readConsent(), 'denied');
  assert.deepEqual(app.commands().at(-1), ['consent', 'update', settings('denied')]);
  assert.equal(app.reloads, 0);
});

test('invalid shared cookie fails closed and requires a new choice', () => {
  const app = harness({ cookies: [{ name: 'bp_consent', value: 'invalid' }] });
  app.initializeAnalytics();
  assert.equal(app.readConsent(), null);
  assert.deepEqual(app.commands()[0], ['consent', 'default', settings('denied')]);
});

test('pushState, replaceState and back/forward send landing pageviews with updated referrers', async () => {
  const app = harness();
  app.initializeAnalytics();
  app.window.history.pushState({}, '', '/changelog');
  await Promise.resolve();
  app.window.history.replaceState({}, '', '/changelog?release=latest');
  await Promise.resolve();
  app.window.location.pathname = '/';
  app.window.location.search = '';
  app.listeners.popstate();
  const views = app.commands().filter((entry) => entry[1] === 'page_view').map((entry) => entry[2]);
  assert.deepEqual(views.map((view) => view.page_location), [
    'https://beatpass.ca/', 'https://beatpass.ca/changelog',
    'https://beatpass.ca/changelog?release=latest', 'https://beatpass.ca/',
  ]);
  assert.deepEqual(views.map((view) => view.page_referrer), [
    'https://example.org/', 'https://beatpass.ca/',
    'https://beatpass.ca/changelog', 'https://beatpass.ca/changelog?release=latest',
  ]);
  assert.ok(views.every((view) => view.content_group === 'landing'));
});

test('same-route state updates and section anchors do not duplicate pageviews', async () => {
  const app = harness();
  app.initializeAnalytics();
  app.window.history.pushState({}, '', '/#pricing');
  await Promise.resolve();
  app.window.history.replaceState({ updated: true }, '', '/');
  await Promise.resolve();
  assert.equal(app.commands().filter((entry) => entry[1] === 'page_view').length, 1);
});

test('initialization is idempotent, including under React StrictMode', () => {
  const app = harness();
  app.initializeAnalytics();
  app.initializeAnalytics();
  assert.equal(app.scripts.length, 1);
  assert.equal(app.commands().filter((entry) => entry[1] === 'page_view').length, 1);
});
