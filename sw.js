// SW v2 (version bump to bust cache)
const CACHE='transam-racer-v1_1';
const ASSETS=['./','./index.html','./manifest.webmanifest?v=2','./assets/icons/icon-192.png','./assets/icons/icon-512.png','./assets/ui/bg.png','./assets/cars/transam.png','./assets/cars/fiat.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(url.origin===location.origin){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;}).catch(()=>caches.match('./index.html'))));}});
