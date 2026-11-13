const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../resources/js/utils/parallax.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function environment(reduced = false) {
  const events = () => ({
    listeners: new Map(),
    addEventListener(name, fn, options) { this.listeners.set(name, { fn, options }); },
    removeEventListener(name) { this.listeners.delete(name); },
    emit(name) { this.listeners.get(name)?.fn(); },
  });
  const window = { ...events(), scrollY: 0 };
  const document = { ...events(), hidden: false };
  const media = { ...events(), matches: reduced };
  window.matchMedia = () => media;
  const frames = new Map();
  let nextFrame = 0;
  const node = { dataset: {}, style: { values: {}, setProperty(name, value) { this.values[name] = value; } } };
  const exports = {};
  vm.runInNewContext(source, { exports, window, document,
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
  });
  const cleanup = exports.attachParallax(node);
  const flush = () => { const current = [...frames.values()]; frames.clear(); current.forEach(fn => fn()); };
  return { window, document, media, frames, node, cleanup, flush };
}

test('passive scrolling coalesces frames and updates depth and fade without React renders', () => {
  const e = environment();
  assert.equal(e.window.listeners.get('scroll').options.passive, true);
  assert.equal(e.node.dataset.motion, 'parallax');
  e.window.scrollY = 800;
  e.window.emit('scroll'); e.window.emit('scroll');
  assert.equal(e.frames.size, 1);
  e.flush();
  assert.equal(e.node.style.values['--parallax-offset'], '280px');
  assert.equal(e.node.style.values['--scene-opacity'], '0.5');
  e.cleanup();
});

test('reduced motion is still on cold load and changing preferences cancels pending motion', () => {
  const e = environment(true);
  assert.equal(e.node.dataset.motion, 'still');
  e.window.scrollY = 300; e.window.emit('scroll');
  assert.equal(e.frames.size, 0);
  assert.equal(e.node.style.values['--parallax-offset'], '0px');
  e.media.matches = false; e.media.emit('change');
  assert.equal(e.node.dataset.motion, 'parallax');
  assert.equal(e.node.style.values['--parallax-offset'], '105px');
  e.window.emit('scroll');
  assert.equal(e.frames.size, 1);
  e.media.matches = true; e.media.emit('change');
  assert.equal(e.frames.size, 0);
  assert.equal(e.node.style.values['--parallax-offset'], '0px');
  e.cleanup();
});

test('hidden documents suspend scheduling and offscreen artwork recovers on return', () => {
  const e = environment();
  e.window.emit('scroll'); e.document.hidden = true; e.document.emit('visibilitychange');
  assert.equal(e.frames.size, 0);
  assert.equal(e.node.dataset.suspended, 'true');
  e.window.scrollY = 1200; e.window.emit('scroll');
  assert.equal(e.frames.size, 0);
  e.document.hidden = false; e.document.emit('visibilitychange');
  assert.equal(e.node.dataset.suspended, 'true');
  assert.equal(e.node.style.values['--scene-opacity'], '0');
  e.window.scrollY = 0; e.window.emit('scroll'); e.flush();
  assert.equal(e.node.dataset.suspended, 'false');
  assert.equal(e.node.style.values['--scene-opacity'], '1');
  e.cleanup();
});

test('cleanup cancels frames and removes scroll, visibility and preference subscriptions', () => {
  const e = environment(); e.window.scrollY = 300; e.window.emit('scroll');
  const pending = [...e.frames.values()][0];
  e.cleanup();
  assert.equal(e.frames.size, 0);
  assert.equal(e.window.listeners.size + e.document.listeners.size + e.media.listeners.size, 0);
  pending();
  assert.equal(e.node.style.values['--parallax-offset'], '0px');
});
