const cacheName = "jfranciscosousa-sw1";
const filesToCache = [
  "/scripts/turbolinks.js",
  "favicon.ico",
  "/",
  "/about",
  "/projects",
  "/books",
  "/blog",
];

const { self, caches, fetch } = this;

self.addEventListener("install", (event) => {
  console.log("[Servicework] Install");

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[ServiceWorker] Caching app shell");

      return cache.addAll(filesToCache);
    }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("[Servicework] Activate");

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            console.log("[ServiceWorker] Removing old cache shell", key);

            return caches.delete(key);
          }

          return null;
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] Fetch");

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
