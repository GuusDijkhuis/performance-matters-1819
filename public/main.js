if('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register(`/service-worker.js`)
  .then(reg => {
    console.log(`Service worker: Registered`)
    return reg.update()
  })
  .catch(err => {
    console.log(`Service worker: Error: ${err}`)
  })
}
