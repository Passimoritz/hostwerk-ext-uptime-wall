const test = require('node:test');
const assert = require('node:assert');
const U = require('../page/lib.js');

test('Zustand', () => { assert.strictEqual(U.state({ ok: true }), 'up'); assert.strictEqual(U.state({ ok: false }), 'down'); assert.strictEqual(U.state({ ok: null }), 'pending'); });
test('Verlaufslinie: Ausfall liegt unten, Breite passt', () => {
  const s = U.spark([[1, 1, 100], [2, 0, 0], [3, 1, 50]], 100, 20).split(' ');
  assert.deepStrictEqual(s, ['0,1', '50,20', '100,10']);
  assert.strictEqual(U.spark([[1, 1, 5]]), '');
});
test('Ausfälle zählen Blöcke', () => { assert.strictEqual(U.outages([[1, 1], [2, 0], [3, 0], [4, 1], [5, 0]]), 2); });
test('Gesamtbild', () => { assert.deepStrictEqual(U.overall([{ ok: true }, { ok: false }, { ok: null }]), { total: 3, down: 1, up: 1, level: 'err' }); assert.strictEqual(U.overall([]).level, 'none'); });
