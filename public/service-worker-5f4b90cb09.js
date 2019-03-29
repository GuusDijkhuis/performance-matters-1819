
// const cacheInstall = [
// '/',
// '/offline',
// '/main-min.css',
// '/jquery-min.js'
// ]
// const cacheFetch = [
// '/details/*'
// ]


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
  console.log("Fetch event");
  e.respondWith(
   caches.match(e.request)
     .then(function(res) {
       if (res) {
         return res
       }
       return fetch(e.request)
     })
  )
})

// self.addEventListener('fetch', (e) => {
//   e.respondWith(fetch(e.request.url)
//   .then(res => {
//     return caches.open('html-cache')
//     .then(cache => {
//       return cache.put(e.request.url, res.clone())
//       .then(() => {
//         return res
//       })
//     })
//   })
//   .catch(err => {
//     return caches.open('html-cache')
//     .then(cache => {
//       return caches.match(e.request.url).then(res => {
//         console.log(res);
//         res ? res : caches.open('core-cache')
//         .then(cache => {
//           return cache.match('/offline').then(res => {
//             return res
//           })
//         })
//       })
//     })
//   }))
// })
