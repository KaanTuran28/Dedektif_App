"use client";

import { motion } from "motion/react";
import type { TimelineEvent } from "@/types/case";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-5">
      <p className="text-text-dim text-sm">
        Vakada bilinen olayların kronolojik şeridi.
      </p>

      <div className="relative pl-6 sm:pl-8">
        <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-accent-red-bright/40" />
        <div className="space-y-6">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.6) }}
              className="relative"
            >
              <span className="absolute -left-6 sm:-left-8 top-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-accent-gold" />
              <p className="font-mono-doc text-accent-gold text-sm font-semibold">{e.time}</p>
              <p className="mt-1 text-text leading-relaxed">{e.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
