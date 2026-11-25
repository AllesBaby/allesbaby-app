import { getStore } from '@netlify/blobs';
import { counterFor, increment, cleanupOld } from '../lib/stats.mjs';

// Nimmt eine anonyme Meldung der App entgegen und zählt sie hoch.
// Liest bewusst keine IP-Adresse und keine weiteren Header aus.
export default async (req) => {
  if (req.method !== 'POST') return new Response(null, { status: 405 });
  let body = null;
  try {
    const text = await req.text();
    if (text.length > 200) return new Response(null, { status: 413 });
    body = JSON.parse(text);
  } catch { return new Response(null, { status: 400 }); }
  const counter = counterFor(body);
  if (!counter) return new Response(null, { status: 400 });
  const store = getStore('statistik');
  await increment(store, counter);
  try { await cleanupOld(store); } catch {}
  return new Response(null, { status: 204 });
};

export const config = { path: '/api/hit' };
