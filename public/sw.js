importScripts(
    '/uv/uv.bundle.js', 
    '/uv/uv.config.js',
    '/scram/scramjet.wasm.js',
    '/scram/scramjet.shared.js',
    '/scram/scramjet.worker.js'
);
importScripts(__uv$config.sw || '/uv/uv.sw.js');
const uv = new UVServiceWorker();
const sj = new ScramjetServiceWorker();
(async function () {
        await sj.loadConfig();
})();
self.addEventListener('fetch', function (event) {
    if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
        event.respondWith(
            (async function () {
                return await uv.fetch(event);
            })(),
        );
    } 
    else if (sj.route(event)) {
        event.respondWith(
            (async function() {
                return await sj.fetch(event);
            })()
        );
    }
    else {
        event.respondWith(
            (async function () {
                return await fetch(event.request);
            })()
        );
    }
});

assets = [
    '/',
    '/favicon.ico',
    '/manifest.json',
    '/transports/bareTransport.js',
    'sw.js',
    'uv.config.js',
    'logo.svg',
];
