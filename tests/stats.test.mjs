// Test der Zähl-Logik ohne Netlify (Speicher wird nachgebildet).
import assert from 'node:assert/strict';
import { counterFor, increment, lastDays, renderStatsPage, dayKey } from '../netlify/lib/stats.mjs';

const mem = new Map();
const store = {
  async get(k) { return mem.has(k) ? JSON.parse(mem.get(k)) : null; },
  async setJSON(k, v) { mem.set(k, JSON.stringify(v)); },
};

assert.equal(counterFor({ e: 'start', v: 'app' }), 'start_app');
assert.equal(counterFor({ e: 'install' }), 'install');
assert.equal(counterFor({ e: 'dauer', v: 'm5_15' }), 'dauer_m5_15');
for (const bad of [null, [], {}, { e: 'start', v: 'x' }, { e: '__proto__' }, { e: 'install', v: 'a' }, { e: 'name', v: 'Hanna' }]) {
  assert.equal(counterFor(bad), null, JSON.stringify(bad));
}
const d = new Date('2026-11-23T10:00:00Z');
await increment(store, 'start_app', d); await increment(store, 'start_app', d); await increment(store, 'install', d);
const rows = await lastDays(store, 3, d);
assert.equal(rows[0].day, dayKey(d));
assert.equal(rows[0].start_app, 2); assert.equal(rows[0].install, 1); assert.equal(rows[1].start_app, 0);
const html = renderStatsPage(rows);
assert.ok(html.includes('Starts gesamt') && html.includes('100 %'));
assert.ok(!/[–—]/.test(html.replace(/<style>[\s\S]*?<\/style>/, '')), 'keine Gedankenstriche');
console.log('Alle Statistik-Tests bestanden.');
