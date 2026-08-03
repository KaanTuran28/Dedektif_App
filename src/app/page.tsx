"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { TutorialFlow } from "@/components/TutorialFlow";

const GUIDE_SEEN_KEY = "supheli:rehber-gorundu";

/** Giriş ekranı: önce ton/atmosfer, sonra tek karar — tek başına mı,
 * arkadaşlarınla mı. Vaka seçimi (hangi dosyayı açacağın) bilinçli olarak
 * burada değil, bu seçimden SONRA gelen ekranlarda (solo için /vaka,
 * çoklu için /oda içindeki ortak oylama). */
export default function HomePage() {
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    const seen = window.localStorage.getItem(GUIDE_SEEN_KEY);
    if (!seen) {
      setGuideOpen(true);
      window.localStorage.setItem(GUIDE_SEEN_KEY, "1");
    }
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      <div className="relative w-full max-w-lg cork-texture rounded-md px-4 sm:px-10 py-14 sm:py-20 overflow-hidden">
        <svg
          className="absolute left-1/2 top-[86px] sm:top-[104px] -translate-x-1/2 w-64 sm:w-80 h-16 opacity-70"
          viewBox="0 0 320 60"
          fill="none"
          aria-hidden
        >
          <path
            d="M10 8 C 80 55, 240 -10, 310 45"
            stroke="var(--accent-red-bright)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative text-center mb-10 sm:mb-12"
        >
          <p className="uppercase tracking-[0.35em] text-accent-gold text-xs sm:text-sm mb-3 font-mono-doc">
            Dijital Dedektiflik Oyunu
          </p>
          <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tight text-[#f2ede4] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            ŞÜPHELİ
          </h1>
          <p className="font-hand text-2xl sm:text-3xl mt-3 text-accent-gold/90">
            &ldquo;Herkes bir şey saklıyor.&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative flex flex-col items-center gap-3"
        >
          <Link
            href="/vaka"
            className="w-full sm:w-80 text-center rounded-sm bg-accent-red-bright px-6 py-4 font-semibold uppercase tracking-wide hover:bg-accent-red transition-colors"
          >
            Tek Başına Oyna
          </Link>
          <Link
            href="/oda"
            className="w-full sm:w-80 text-center rounded-sm border border-accent-gold/50 text-accent-gold px-6 py-4 font-semibold uppercase tracking-wide hover:bg-accent-gold/10 transition-colors"
          >
            👥 Arkadaşlarınla Oyna
          </Link>
          <button
            onClick={() => setGuideOpen(true)}
            className="mt-2 rounded-sm border border-white/15 text-text-dim px-5 py-2.5 text-sm font-semibold uppercase tracking-wide hover:text-text hover:border-white/30 transition-colors"
          >
            📖 Nasıl Oynanır?
          </button>
        </motion.div>
      </div>

      <TutorialFlow open={guideOpen} onClose={() => setGuideOpen(false)} />
    </main>
  );
}
