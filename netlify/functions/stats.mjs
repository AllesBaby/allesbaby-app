import { getStore } from '@netlify/blobs';
import { lastDays, renderStatsPage } from '../lib/stats.mjs';

// Statistikseite unter /statistik, geschützt per Passwort.
// Passwort = Umgebungsvariable STATS_PASSWORT in Netlify. Der Benutzername ist egal.
export default async (req) => {
  const secret = Netlify.env.get('STATS_PASSWORT');
  if (!secret) return new Response('STATS_PASSWORT ist in Netlify nicht gesetzt.', { status: 500 });
  const auth = req.headers.get('authorization') || '';
  let pass = '';
  if (auth.startsWith('Basic ')) {
    try { pass = new TextDecoder().decode(Uint8Array.from(atob(auth.slice(6)), c => c.charCodeAt(0))).split(':').slice(1).join(':'); } catch {}
  }
  if (pass !== secret) {
    return new Response('Bitte anmelden.', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Statistik", charset="UTF-8"' } });
  }
  const rows = await lastDays(getStore('statistik'), 30);
  return new Response(renderStatsPage(rows), {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' },
  });
};

export const config = { path: '/statistik' };
