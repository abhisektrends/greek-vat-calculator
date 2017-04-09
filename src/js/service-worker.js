(function serviceWorker () {
    'use strict';

    //var version = '0.1';

    self.addEventListener('install', function (event) {
        var timeStamp = Date.now();

        event.waitUntil(caches.open('greek-vat-calc').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html?timestamp=' + timeStamp
            ])
            .then(function () {
                return self.skipWaiting();
            });
        }));
    });

    self.addEventListener('activate', function (event) {
        event.waitUntil(self.clients.claim());
    });

    self.addEventListener('fetch', function (event) {
        event.respondWith(caches.match(event.request, {
            ignoreSearch: true
        })
        .then(function (response) {
            return response || fetch(event.request);
        }));
    });
})();
