const CACHE_NAME = "autolead-pwa-v8";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js?v=8",
  "./firebase-config.js?v=8",
  "./manifest.webmanifest",
  "./assets/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// Open/focus the app when user taps a notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "./";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ("focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});

// Stub for future Firebase Cloud Messaging push notifications
// To enable: set up FCM in Firebase Console, add VAPID key, subscribe in app.js
self.addEventListener("push", (event) => {
  if (!event.data) return;
  let payload;
  try { payload = event.data.json(); } catch (_) { return; }
  event.waitUntil(
    self.registration.showNotification(payload.title || "AutoLead", {
      body:   payload.body  || "",
      icon:   "./assets/icon.svg",
      badge:  "./assets/icon.svg",
      tag:    payload.tag   || "autolead-push",
      renotify: true,
      data:   { url: "./" }
    })
  );
});
