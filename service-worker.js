const CACHE_NAME = 'cr3-stock-take-cache-v1.2';
const urlsToCache = [
    '/cr3-stock-take/',
    '/cr3-stock-take/index.html',
    '/cr3-stock-take/app.js',
    '/cr3-stock-take/manifest.json',
    '/cr3-stock-take/icons/icon-192x192.png',
    '/cr3-stock-take/icons/icon-512x512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


