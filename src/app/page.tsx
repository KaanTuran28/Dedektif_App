import Link from "next/link";
import { allCases } from "@/data/cases";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-3xl text-center mb-12 sm:mb-16">
        <p className="uppercase tracking-[0.3em] text-accent-gold text-xs sm:text-sm mb-3">
          Dijital Dedektiflik Oyunu
        </p>
        <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tight">
          ŞÜPHELİ
        </h1>
        <p className="text-text-dim italic mt-4 text-base sm:text-lg">
          &ldquo;Herkes bir şey saklıyor.&rdquo;
        </p>
      </div>

      <div className="w-full max-w-3xl grid gap-5 sm:gap-6">
        {allCases.map((c) => (
          <Link
            key={c.id}
            href={`/vaka/${c.id}`}
            className="group block rounded-lg border border-white/10 bg-panel p-5 sm:p-7 transition hover:border-accent-red-bright/60 hover:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent-gold mb-1">
                  Vaka {String(c.order).padStart(2, "0")} · {c.difficulty}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold">
                  {c.title}
                </h2>
                <p className="text-text-dim mt-2 max-w-xl text-sm sm:text-base">
                  {c.tagline}
                </p>
              </div>
              <span className="hidden sm:inline-block shrink-0 text-accent-red-bright text-2xl transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-text-dim text-xs mt-16">Yakında yeni vakalar eklenecek.</p>
    </main>
  );
}
