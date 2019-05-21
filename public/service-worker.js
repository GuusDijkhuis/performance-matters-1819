const cacheName = 'core-cache'
const cacheInstall = [
  '/offline',
  '/main-min.css',
  '/jquery-min.js'
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
    .open('core-cache')
    .then(cache => {
      return cache.addAll(cacheInstall)
    })
    .then(() => {
      self.skipWaiting()
    })
  )
})

self.addEventListener('activate', (e) => {
  console.log(`Activate event`);
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
    .then(res => {
      caches
        .open(cacheName)
        .then(cache => {
          cache.put(e.request.url, res.clone());
        })
      return res;
    })
    .catch(err => {
      return caches.match(e.request.url)
      .then(res => {
        if (res) {
          return res
        } else {
          return caches
          .open(cacheName)
          .then(cache => {
            return cache.match('/offline')
            .then(response => {
              return response
            })
          })
        }
      })

    })
  )
})
