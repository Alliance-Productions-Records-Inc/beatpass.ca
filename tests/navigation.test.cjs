const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../resources/js/utils/navigation.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const exportsUnderTest = {};
vm.runInNewContext(source, { exports: exportsUnderTest, encodeURIComponent });
const { searchDestination } = exportsUnderTest;

test('empty and whitespace-only searches go directly to discovery', () => {
  for (const query of ['', '   ', '\n\t']) assert.equal(searchDestination(query), 'https://open.beatpass.ca/discover');
});

test('search removes only surrounding whitespace and preserves the requested words', () => {
  assert.equal(searchDestination('  R&B soul  '), 'https://open.beatpass.ca/search/R%26B%20soul');
});

test('search preserves Unicode and encodes reserved characters as a single route segment', () => {
  const query = 'été / 東京? #100%';
  const destination = new URL(searchDestination(query));
  assert.equal(destination.origin, 'https://open.beatpass.ca');
  assert.equal(destination.pathname.split('/').length, 3);
  assert.equal(decodeURIComponent(destination.pathname.slice('/search/'.length)), query);
  assert.equal(destination.search, '');
  assert.equal(destination.hash, '');
});
