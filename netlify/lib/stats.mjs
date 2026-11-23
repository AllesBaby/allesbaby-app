// Schmale, anonyme Nutzungsstatistik für Alles Baby.
// Gespeichert werden NUR Tageszähler. Keine IP-Adresse, keine Kennung, kein Gerätetyp, keine Inhalte.

export const EVENTS = {
  start: ['app', 'browser'],              // App geöffnet: als installierte App oder im Browser
  dauer: ['u1', 'm1_5', 'm5_15', 'u15'],  // Nutzung am Stück: unter 1, 1 bis 5, 5 bis 15, über 15 Minuten
  install: [''],                          // Installation (nur Android meldet das)
};
export const COUNTERS = ['start_app', 'start_browser', 'dauer_u1', 'dauer_m1_5', 'dauer_m5_15', 'dauer_u15', 'install'];

// Prüft eine Meldung und liefert den Zählernamen oder null.
export function counterFor(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const e = String(body.e ?? ''), v = String(body.v ?? '');
  if (!Object.hasOwn(EVENTS, e) || !EVENTS[e].includes(v)) return null;
  return v ? `${e}_${v}` : e;
}

// Tagesschlüssel in deutscher Zeit (JJJJ-MM-TT)
export function dayKey(date = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(date);
}

export async function increment(store, counter, date = new Date()) {
  const key = `tag/${dayKey(date)}`;
  // Lesen, hochzählen, schreiben. Treffen zwei Meldungen exakt gleichzeitig ein, kann selten
  // eine verloren gehen. Für eine grobe Statistik ist das in Ordnung.
  const cur = (await store.get(key, { type: 'json' })) || {};
  cur[counter] = (Number(cur[counter]) || 0) + 1;
  await store.setJSON(key, cur);
  return cur;
}

export async function lastDays(store, days = 30, today = new Date()) {
  const rows = [];
  for (let i = 0; i < days; i++) {
    const key = dayKey(new Date(today.getTime() - i * 864e5));
    const v = (await store.get(`tag/${key}`, { type: 'json' })) || {};
    rows.push({ day: key, ...Object.fromEntries(COUNTERS.map(c => [c, Number(v[c]) || 0])) });
  }
  return rows;
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const de = n => Number(n).toLocaleString('de-DE');
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0) + ' %';

export function renderStatsPage(rows) {
  const sum = Object.fromEntries(COUNTERS.map(c => [c, rows.reduce((a, r) => a + r[c], 0)]));
  const starts = sum.start_app + sum.start_browser;
  const dauerTotal = sum.dauer_u1 + sum.dauer_m1_5 + sum.dauer_m5_15 + sum.dauer_u15;
  const fmtDay = k => { const [y, m, d] = k.split('-'); return `${d}.${m}.${y}`; };
  const tr = rows.map(r => `<tr><td>${esc(fmtDay(r.day))}</td><td>${de(r.start_app + r.start_browser)}</td><td>${de(r.start_app)}</td><td>${de(r.start_browser)}</td><td>${de(r.install)}</td><td>${de(r.dauer_u1)}</td><td>${de(r.dauer_m1_5)}</td><td>${de(r.dauer_m5_15)}</td><td>${de(r.dauer_u15)}</td></tr>`).join('');
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>Statistik · Alles Baby</title>
<style>
:root{--bg:#faf7f2;--fg:#4a3f4a;--muted:#6f616f;--card:#fff;--line:#eee6ee}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:960px;margin:0 auto;padding:24px 16px 48px}
h1{font-size:24px;margin:0 0 4px}p{margin:0 0 20px;color:var(--muted)}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-bottom:24px}
.kpi{background:var(--card);border-radius:16px;padding:14px 16px;box-shadow:0 2px 10px rgba(74,63,74,.06)}
.kpi b{display:block;font-size:26px}.kpi span{font-size:13px;color:var(--muted)}
.wrap{overflow-x:auto;background:var(--card);border-radius:16px;box-shadow:0 2px 10px rgba(74,63,74,.06)}
table{border-collapse:collapse;width:100%;min-width:720px;font-size:14px}
th,td{padding:8px 10px;text-align:right;border-bottom:1px solid var(--line);white-space:nowrap}
th:first-child,td:first-child{text-align:left}th{font-size:12px;color:var(--muted);font-weight:600}
</style></head><body><main>
<h1>Nutzungsstatistik</h1>
<p>Letzte 30 Tage. Gezählt werden Starts, nicht Personen. Keine IP-Adressen, keine Kennungen.</p>
<div class="kpis">
<div class="kpi"><b>${de(starts)}</b><span>Starts gesamt</span></div>
<div class="kpi"><b>${pct(sum.start_app, starts)}</b><span>davon als installierte App</span></div>
<div class="kpi"><b>${de(sum.install)}</b><span>Installationen (nur Android meldet sie)</span></div>
<div class="kpi"><b>${pct(sum.dauer_m5_15 + sum.dauer_u15, dauerTotal)}</b><span>Nutzung am Stück über 5 Minuten</span></div>
</div>
<div class="wrap"><table><thead><tr><th>Tag</th><th>Starts</th><th>als App</th><th>im Browser</th><th>Installationen</th><th>unter 1 Minute</th><th>1 bis 5 Minuten</th><th>5 bis 15 Minuten</th><th>über 15 Minuten</th></tr></thead><tbody>${tr}</tbody></table></div>
</main></body></html>`;
}
