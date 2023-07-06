//asignar un nombre y version al cache
// dir_project
const CACHE_NAME = 'v1_locked_cache',
  urlsToCache = [
    '/_j.em/app/current.txt',
    '/_j.em/app/index.html',
    '/_j.em/app/j-em.css',
    '/_j.em/app/j-em.js',
    '/_j.em/app/last.txt',
    '/_j.em/app/manifest.json',
    '/_j.em/app/menu-apk.css',
    '/_j.em/app/menu-apk.js',
    '/_j.em/app/sw.js',
    '/_j.em/links/',
    '/_j.em/links/links.js',
    '/_j.em/links/bookmaps/app_links.css',
    '/_j.em/links/bookmaps/app-link.js',
    '/_j.em/links/bookmaps/app-map.css',
    '/_j.em/links/bookmaps/app-map.js',
    '/_j.em/links/bookmaps/app-s-find.js',
    '/_j.em/links/bookmaps/bookmaps.css',
    '/_j.em/links/bookmaps/book-txt.js',
    '/_j.em/links/bookmaps/cubik.png',
    '/_j.em/links/bookmaps/finds.js',
    '/_j.em/links/bookmaps/getlogin.js',
    '/_j.em/links/bookmaps/gradient_bar.png',
    '/_j.em/links/bookmaps/index.html',
    '/_j.em/links/bookmaps/main.js',
  ]
//durante la fase de instalacion, generalmente se almacena en cache los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('fail cache register', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexion
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en cache o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})