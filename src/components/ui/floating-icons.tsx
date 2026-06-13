"use client";
import { motion } from "framer-motion";
import { Server, Cloud, Shield, Network, Database, Cpu, Wifi, HardDrive, Lock, Activity } from "lucide-react";

const ICONS = [Server, Cloud, Shield, Network, Database, Cpu, Wifi, HardDrive, Lock, Activity];

/**
 * Slowly drifting domain icons in the background. Each icon has a stable
 * position (seed-based) and bobs gently. Decorative — pointer events off.
 *
 *   <FloatingIcons className="absolute inset-0 pointer-events-none opacity-30" />
 */
export function FloatingIcons({
  className = "",
  count     = 8,
}: { className?: string; count?: number }) {
  // Seed-based, deterministic layout — no Math.random on the render path.
  const items = Array.from({ length: count }, (_, i) => {
    const xPct = (i * 37 + 11) % 100;
    const yPct = (i * 53 + 17) % 100;
    return {
      Icon:   ICONS[i % ICONS.length],
      size:   16 + ((i * 7) % 18),
      xPct,
      yPct,
      delay:  (i * 0.5) % 4,
      drift:  6 + (i % 6),
    };
  });

  return (
    <div className={`${className}`}>
      {items.map(({ Icon, size, xPct, yPct, delay, drift }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: [0, 0.65, 0.65, 0.4, 0.65], y: [0, -drift, 0, drift, 0] }}
          transition={{ duration: 8 + (i % 4), delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute text-[var(--accent-violet)]"
          style={{ left: `${xPct}%`, top: `${yPct}%` }}
        >
          <Icon size={size} strokeWidth={1.2} />
        </motion.div>
      ))}
    </div>
  );
}
