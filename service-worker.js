self.addEventListener('install', event => {
  self.skipWaiting(); // Immediately activate the new service worker
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './app.js',
        './manifest.json',
        './assets/icon-192.png',
        './assets/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});

// Push notification handling
self.addEventListener('push', event => {
  const data = event.data?.json() || { title: "Quesada Recipes", body: "New update available!" };
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'assets/icon-192.png'
  });
});
