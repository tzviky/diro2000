const CACHE_NAME='diro2000-bot-main-msg-v1';
const FILES=['./','./index.html','./manifest.json','./icon.svg','./bot.svg'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  event.respondWith(caches.match(event.request).then(resp=>resp||fetch(event.request)));
});
