const CACHE_NAME = 'CR3-Stock-Take-v1';
const urlsToCache = [
    '/CR3-Stock-Take/',
    '/CR3-Stock-Take/index.html',
    '/CR3-Stock-Take/app.js',
    '/CR3-Stock-Take/manifest.json',
    '/CR3-Stock-Take/icons/CR3icon-192x192.png',
    '/CR3-Stock-Take/icons/icon-512x512.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.error('Cache installation failed:', error);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached response if found
                if (response) {
                    return response;
                }
                // Otherwise fetch from network
                return fetch(event.request);
            })
            .catch(function(error) {
                console.error('Fetch failed:', error);
                // You might want to return a custom offline page here
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
