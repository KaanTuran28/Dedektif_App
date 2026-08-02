"use client";

import { AnimatePresence, motion } from "motion/react";

const STEPS = [
  {
    icon: "📁",
    title: "Bir vaka seç",
    text: "Her vaka gerçek bir cinayet dosyası gibi kurgulanmış: bir kurban, birkaç şüpheli, gerçek bir katil.",
  },
  {
    icon: "🔍",
    title: "Kanıtları ve şüphelileri incele",
    text: "Raporlar, mesaj dökümleri, ifadeler, ses/kamera kayıtları... Her belge bir ipucu taşıyabilir.",
  },
  {
    icon: "⏱️",
    title: "Zaman çizelgesindeki çelişkileri yakala",
    text: "Bazı şüphelilerin ifadeleri, bilinen olaylarla çelişiyor. Şüpheliyi doğru olaya sürükleyip bırak.",
  },
  {
    icon: "📌",
    title: "Pano'da bağlantı kur",
    text: "Kanıtları ve şüphelileri kırmızı iplikle birbirine bağla, kartlara kendi notlarını iğnele.",
  },
  {
    icon: "💡",
    title: "Takılırsan ipucu al",
    text: "Sağ üstteki ipucu butonu seni yönlendirir — ama kullanmak dedektif rütbeni biraz düşürür.",
  },
  {
    icon: "⚖️",
    title: "Katili suçla",
    text: "Şüpheliyi seç, sonra motivini ve yöntemini de doğru bil. Bu karar geri alınamaz, emin olunca onayla.",
  },
  {
    icon: "🏅",
    title: "Rütbeni kazan, paylaş",
    text: "Ne kadar titiz araştırdıysan rütben o kadar yüksek olur. Sonucu bir görsel olarak paylaşabilirsin.",
  },
];

export function HowToPlayModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-md border border-accent-gold/40 bg-panel p-6 sm:p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Kapat"
              className="absolute top-4 right-4 h-8 w-8 rounded-sm border border-white/15 text-text-dim hover:text-text hover:border-white/30 transition-colors flex items-center justify-center"
            >
              ✕
            </button>

            <p className="text-[11px] uppercase tracking-widest text-accent-gold font-mono-doc mb-1">
              ŞÜPHELİ
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-1">
              Nasıl Oynanır?
            </h2>
            <p className="text-text-dim text-sm mb-6">
              Sen bir dedektifsin. Her vaka bir cinayet — kanıtları toplayıp
              gerçek katili bulman gerekiyor.
            </p>

            <div className="space-y-4">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xl shrink-0 leading-none mt-0.5">{s.icon}</span>
                  <div>
                    <p className="font-display font-bold text-sm sm:text-base">
                      {i + 1}. {s.title}
                    </p>
                    <p className="text-text-dim text-sm leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="mt-7 w-full rounded-sm bg-accent-gold text-black px-6 py-3 font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              Anladım, Soruşturmaya Başlayalım
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
