const CACHE_NAME = 'mingde2-cache-v27.12';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'css/style.css?v=27.12',
  'js/main.js?v=27.12',
  'manifest.json',
  'favicon.svg',
  'images/icon-192.png',
  'images/icon-512.png'
];

// 摰?????憛?箸敹怠?
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// ???皜?翰??
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ?敹??伐?蝬脰楝?芸?蝑 Network-First嚗?潭??文?蝡?API??
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // ?湔? Google Apps Script API ???刻楊??瘙?蝯??????
  if (url.includes('script.google.com') || 
      url.includes('googleusercontent.com') || 
      url.includes('googleapis.com') ||
      !url.startsWith(self.location.origin)) {
    return; // ?湔鈭斤?汗?典??雯頝航???
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
