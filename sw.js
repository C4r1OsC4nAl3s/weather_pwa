
//shell cache

const shellCache = 'shell-cache-v1';
const shellAssets = [
    '/',
    './img/01-s.png',
    './img/sunCloud.png',
    './pages/index.html',
    './css/stryles2.css',
    './app2.js',
    './providers/accuweather.js',
    './providers/location.js',
    './config.js'
    
];

//install event
self.addEventListener('install', event => {
    console.log('Service worker installed', event);
    //pre-cache shell assets
    console.log('App shell cache');
    event.waitUntil(
        caches.open(shellCache).then(cache => {
                cache.addAll(shellAssets);
            }
        )
    );
});


//activate event
self.addEventListener('activate', event => {
    console.log('Service worker activate', event);

    //delete ol caches
    event.waitUntil(
        caches.keys().then( keys => {
            return Promise.all(keys
                .filter(key => key !== shellCache)
                .map(key => caches.delete(key))
            )
        })
    );

});

//fetch listener
self.addEventListener('fetch', event => {
    console.log('Fetch event', event);
    event.respondWith(
        caches.match(event.request).then( cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    );
});
