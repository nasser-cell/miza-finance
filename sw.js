const CACHE = 'miza-v3';
const ASSETS = ['./index.html', './manifest.json'];

// IMPORTANT: Increment CACHE version string every time you deploy code changes.
// Change 'miza-v2' to 'miza-v3', then 'miza-v4', etc.
// This ensures the activate event (line 10-12) deletes the old cache
// and forces browsers to fetch the fresh index.html.

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
