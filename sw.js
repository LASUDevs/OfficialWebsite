var dataCacheName = 'LASUDevsWebSitev8'
var cacheName = 'LASUDevsWebSiteCv8'
var filesToCache = [
    '/',
    'js/app.js',
    'js/jquery-slim.min.js',
    'js/jquerymin.js',
    'js/typed.min.js',
    'js/popper.min.js',
    'js/bootstrap.min.js',
    'css/bootstrap.min.css',
    'css/style.css',
    'images/lasudevs-logo.png',
    'images/group_picture.jpg',
    'images/team/abdulmatin.jpeg',
    'images/team/codeblooded.jpg',
    'images/team/haneefah.jpg',
    'images/team/taofeek.jpg',
]
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install')
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell')
            return cache.addAll(filesToCache)
        })
    )
})
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate')
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key)
                    return caches.delete(key)
                }
            }))
        })
    )
    return self.clients.claim()
})

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.method , " ",e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request)
        })
    )
})