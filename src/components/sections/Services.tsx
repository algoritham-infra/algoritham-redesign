"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Server } from "lucide-react";
import Link from "next/link";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CircuitLines } from "@/components/ui/circuit-lines";
import { iconFor } from "@/lib/icon-map";
import type { Home, Service } from "@/sanity/types";

const ACCENT_THEME: Record<NonNullable<Service["accent"]>, {
  grad: string; ring: string; icon_bg: string; tag_bg: string;
}> = {
  rose:   { grad: "from-[#e63946] to-[#c0417a]", ring: "hover:border-rose-500/30",  icon_bg: "bg-rose-500/10 text-rose-500",     tag_bg: "bg-rose-500/10 text-[var(--accent-rose)] border-rose-500/20"  },
  violet: { grad: "from-[#7c3aed] to-[#06b6d4]", ring: "hover:border-violet-500/30",icon_bg: "bg-violet-500/10 text-violet-500", tag_bg: "bg-violet-500/10 text-[var(--accent-violet)] border-violet-500/20" },
  cyan:   { grad: "from-[#06b6d4] to-[#2563eb]", ring: "hover:border-cyan-500/30",  icon_bg: "bg-cyan-500/10 text-cyan-500",     tag_bg: "bg-cyan-500/10 text-[var(--accent-cyan)] border-cyan-500/20"  },
  blue:   { grad: "from-[#2563eb] to-[#7c3aed]", ring: "hover:border-blue-500/30",  icon_bg: "bg-blue-500/10 text-blue-500",     tag_bg: "bg-blue-500/10 text-[var(--accent-violet)] border-blue-500/20" },
  pink:   { grad: "from-[#c0417a] to-[#7c3aed]", ring: "hover:border-pink-500/30",  icon_bg: "bg-pink-500/10 text-pink-500",     tag_bg: "bg-pink-500/10 text-[var(--accent-rose)] border-pink-500/20"  },
};

export function Services({ home, services }: { home: Home; services: Service[] }) {
  return (
    <section id="services" className="relative bg-[var(--bg-base)] py-24 overflow-hidden">
      {/* Circuit-line illustration drifts across the top half */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] opacity-30 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]">
        <CircuitLines density={4} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">{home.servicesEyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight mb-4 whitespace-pre-line">
            {home.servicesHeadline}
          </h2>
          <p className="text-[var(--text-2)] text-lg leading-relaxed">{home.servicesSubhead}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const Icon = iconFor(s.icon, Server);
            const theme = ACCENT_THEME[s.accent ?? "violet"];
            const href  = `/services#${s.slug?.current ?? ""}`;
            return (
              <motion.div
                key={s.num ?? s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                {/* Whole card is the link — clicking anywhere navigates,
                    avoiding the prior tiny "Learn more" hit target. */}
                <Link href={href} prefetch={true} aria-label={`Learn more about ${s.title}`} className="block h-full">
                  <CardSpotlight className={`group rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] ${theme.ring} transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 h-full`}>
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.icon_bg}`}>
                          <Icon size={18} />
                        </div>
                        <span className={`text-3xl font-black bg-gradient-to-br ${theme.grad} bg-clip-text text-transparent opacity-30 select-none`}>
                          {s.num}
                        </span>
                      </div>

                      <h3 className="text-[var(--text-1)] font-bold text-lg mb-2">{s.title}</h3>
                      <p className="text-[var(--text-2)] text-sm leading-relaxed mb-5 flex-1">{s.summary}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(s.tags ?? []).map((t) => (
                          <span key={t} className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${theme.tag_bg}`}>{t}</span>
                        ))}
                      </div>

                      <span className="flex items-center gap-1 text-xs text-[var(--text-3)] group-hover:text-[var(--accent-violet)] transition-colors mt-auto">
                        Learn more <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </CardSpotlight>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
