// Firebase Messaging — handles push notifications when app is closed
importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDVv_Qk_aF0-qsujnP1sLdnlGNw3pzNm00",
  authDomain: "autolead-app.firebaseapp.com",
  projectId: "autolead-app",
  storageBucket: "autolead-app.firebasestorage.app",
  messagingSenderId: "460106742616",
  appId: "1:460106742616:web:df0dc59e9b624a00f2832d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "AutoLead";
  const body  = payload.notification?.body  || "";
  const link  = payload.fcmOptions?.link || "./";
  return self.registration.showNotification(title, {
    body,
    icon:     "./assets/icon.svg",
    badge:    "./assets/icon.svg",
    tag:      "autolead-push",
    renotify: true,
    data:     { url: link }
  });
});

// ─── Cache-first PWA shell ─────────────────────────────────────────────────────
const CACHE_NAME = "autolead-pwa-v9";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js?v=9",
  "./firebase-config.js?v=9",
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
