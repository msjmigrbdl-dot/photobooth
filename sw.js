// Service worker: membuat aplikasi bisa di-install dan tampilannya tetap terbuka saat sinyal lemah.
// Naikkan VERSI setiap kali index.html diubah agar HP mengambil versi baru.
const VERSI = 'photobooth-v2';
const FILE_INTI = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSI).then(function (c) { return c.addAll(FILE_INTI); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSI; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return; // permintaan ke Apps Script (POST) tidak disentuh
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // CDN & Google tidak di-cache di sini

  // Network-first: selalu coba versi terbaru, pakai cache bila offline
  e.respondWith(
    fetch(req).then(function (res) {
      const salinan = res.clone();
      caches.open(VERSI).then(function (c) { c.put(req, salinan); });
      return res;
    }).catch(function () {
      return caches.match(req).then(function (r) { return r || caches.match('./index.html'); });
    })
  );
});
