const cacheInstall = [
'/',
'/offline',
'main-min.css',
'jquery-min.js'
]
const cacheFetch = [
'/details/*'
]


self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
    .open('core-cache')
    .then(cache => {
      cache.addAll(['/offline'])
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
  e.respondWith(fetch(e.request)
  .then(res => {
    return caches.open('html-cache')
    .then(cache => {
      cache.put(e.request.url, res.clone()
      .then(() => {
        return res
      }))
    })
  })
  .catch(err => {
    caches.open('html-cache')
    .then(cache => {
      caches.match(e.request.url).then(res => {
        console.log(res);
        res ? res : caches.open('core-cache')
        .then(cache => {
          return cache.match('/offline').then(res => {
            return res
          })
        })
      })
    })


  }))
  console.log(`Fetched event`);
})
