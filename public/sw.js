// Bei JEDER Auslieferung hochzählen, sonst sehen installierte Apps den alten Stand.
const CACHE = 'babyapp-v15';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/rezepte.json',
  '/prep_guide.json',
  '/fonts/outfit-latin.woff2',
  '/fonts/figtree-latin.woff2',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/icon-maskable-512.png',
  '/favicon.svg',
  '/favicon-32.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  // Statistik und Statistikseite nie aus dem Cache bedienen
  const u = new URL(e.request.url);
  if (u.pathname.startsWith('/api/') || u.pathname === '/statistik') return;
  if(e.request.mode === 'navigate'){
    e.respondWith((async()=>{
      try{
        const fresh = await fetch(e.request);
        const c = await caches.open(CACHE);
        c.put('/index.html', fresh.clone());
        return fresh;
      }catch(err){
        return (await caches.match('/index.html')) || Response.error();
      }
    })());
    return;
  }
  // Network-first for JSON data files so expert updates are picked up automatically
  if(e.request.url.endsWith('.json')){
    e.respondWith((async()=>{
      try{
        const fresh = await fetch(e.request);
        const c = await caches.open(CACHE);
        c.put(e.request, fresh.clone());
        return fresh;
      }catch(err){
        return (await caches.match(e.request)) || Response.error();
      }
    })());
    return;
  }
  // Cache-first for everything else (icons, assets)
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// Push notifications
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Alles Baby', {
      body: data.body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
    })
  );
});
