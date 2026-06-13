"use client";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { iconFor } from "@/lib/icon-map";
import type { Home, Certification } from "@/sanity/types";

export function Certifications({ home, items }: { home: Home; items: Certification[] }) {
  return (
    <section className="relative bg-[var(--bg-base)] py-24 overflow-hidden">
      {/* Slow-drifting domain icons in the background, masked away from centre
          so the content reads cleanly. */}
      <FloatingIcons className="absolute inset-0 pointer-events-none opacity-25 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_30%,#000_90%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">{home.certsEyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight mb-4">{home.certsHeadline}</h2>
          {home.certsSubhead && (
            <p className="text-[var(--text-2)] text-lg max-w-xl mx-auto">{home.certsSubhead}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((c, i) => {
            const Icon = iconFor(c.icon, Award);
            return (
              <motion.div key={c.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-500/25 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/15 to-[#06b6d4]/15 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-violet-500" />
                </div>
                <h3 className="text-[var(--text-1)] font-bold mb-2">{c.title}</h3>
                <p className="text-[var(--text-2)] text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
