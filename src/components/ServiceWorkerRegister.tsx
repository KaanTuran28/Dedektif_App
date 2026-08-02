"use client";

import { useEffect } from "react";

/** Servis çalışanını sadece üretimde kaydeder — geliştirme sırasında
 * (npm run dev) önbellek, hot-reload'u yanıltmasın diye devre dışı. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  return null;
}
