"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { allCases } from "@/data/cases";
import { tiltFor } from "@/lib/tilt";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center px-3 sm:px-4 py-8 sm:py-12">
      <div className="relative w-full max-w-3xl cork-texture rounded-md px-4 sm:px-10 py-12 sm:py-16 overflow-hidden">
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
          className="relative text-center mb-10 sm:mb-14"
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

        <div className="relative w-full grid gap-6 sm:gap-8 sm:grid-cols-2">
          {allCases.map((c, i) => {
            const tilt = tiltFor(c.id);
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 18, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: tilt }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                whileHover={{ rotate: 0, y: -3 }}
                className="relative"
              >
                <Link
                  href={`/vaka/${c.id}`}
                  className="group relative block paper-card rounded-sm p-5 sm:p-6 shadow-xl"
                >
                  <div className="pin" />
                  <p className="text-[11px] uppercase tracking-widest text-accent-red font-mono-doc mb-1">
                    Vaka {String(c.order).padStart(2, "0")} · {c.difficulty}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-paper-ink">
                    {c.title}
                  </h2>
                  <p className="text-paper-ink/70 mt-2 text-sm sm:text-base">
                    {c.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-accent-red text-sm font-semibold uppercase tracking-wide">
                    Dosyayı Aç
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-text-dim text-xs mt-10 font-mono-doc">
        Yakında yeni vakalar eklenecek.
      </p>
    </main>
  );
}
