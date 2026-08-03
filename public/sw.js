const CACHE_NAME = "supheli-v2";
const PRECACHE_URLS = ["/", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// Ağ öncelikli: her zaman taze sürümü dener (Next.js her deploy'da JS/CSS
// dosya adlarını değiştiriyor — eski önbellek öncelikli olsaydı yeni
// deploy'lardan sonra artık var olmayan eski dosyalara işaret eden bayat
// bir sayfa sunulur, uygulama hiç açılmazdı). Önbellek SADECE ağ
// erişilemezken (çevrimdışı) devreye giriyor.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
