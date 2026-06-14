"use client";
import { motion } from "framer-motion";

/**
 * Vertical "data stream" illustration. A column of dots that pulse and a
 * scrolling streak that reads as packets travelling through a pipe.
 *
 *   <DataStream className="absolute right-8 top-1/4 h-1/2 w-16 opacity-50" />
 */
export function DataStream({
  className = "",
  dots      = 12,
}: { className?: string; dots?: number }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* The pipe — gradient line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.55), rgba(6,182,212,0.55), transparent)" }}
      />

      {/* Pulsing dots */}
      <div className="absolute inset-0 flex flex-col justify-between py-2">
        {Array.from({ length: dots }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto w-1.5 h-1.5 rounded-full bg-[var(--accent-violet)]"
          />
        ))}
      </div>

      {/* Scrolling streak */}
      <motion.div
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 -translate-x-1/2 w-2 h-12 rounded-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(167,139,250,0.85), transparent)", filter: "blur(2px)" }}
      />
    </div>
  );
}
