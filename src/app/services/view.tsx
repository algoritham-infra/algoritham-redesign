"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles, Server } from "lucide-react";
import Link from "next/link";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CircuitLines } from "@/components/ui/circuit-lines";
import { iconFor } from "@/lib/icon-map";
import type { Service, ServicesPage } from "@/sanity/types";

const ACCENT: Record<NonNullable<Service["accent"]>, { color: string; grad: string }> = {
  rose:   { color: "var(--accent-rose)",   grad: "from-[#e63946] to-[#c0417a]" },
  violet: { color: "var(--accent-violet)", grad: "from-[#7c3aed] to-[#06b6d4]" },
  cyan:   { color: "var(--accent-cyan)",   grad: "from-[#06b6d4] to-[#2563eb]" },
  blue:   { color: "var(--accent-violet)", grad: "from-[#2563eb] to-[#7c3aed]" },
  pink:   { color: "var(--accent-rose)",   grad: "from-[#c0417a] to-[#7c3aed]" },
};

export function ServicesView({ page, services }: { page: ServicesPage; services: Service[] }) {
  const [activeId, setActiveId] = useState<string>(services[0]?.slug?.current ?? "");

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY + 180;
      let bestId = services[0]?.slug?.current ?? "", bestDist = Infinity;
      for (const s of services) {
        const id = s.slug?.current;
        if (!id) continue;
        const el = document.getElementById(id);
        if (!el) continue;
        const offset = Math.abs(el.offsetTop - top);
        if (offset < bestDist) { bestDist = offset; bestId = id; }
      }
      setActiveId(bestId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [services]);

  return (
    <>
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,58,237,0.10),transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-35 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]">
          <CircuitLines density={4} />
        </div>
        <div
          className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_85%)]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border-strong) 0.8px, transparent 0.8px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <Sparkles size={12} /> {page.eyebrow}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-1)] tracking-tight mb-5 leading-[1.05]">
              {page.headlinePre}<br />
              <span className="brand-gradient animate-gradient">{page.headlineGradient}</span>
            </h1>
            <p className="text-[var(--text-2)] text-lg md:text-xl max-w-2xl leading-relaxed">{page.subhead}</p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-16 z-20 bg-[var(--bg-base)]/85 backdrop-blur-xl border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex items-center gap-1 py-3 min-w-max">
            {services.map((s) => {
              const Icon = iconFor(s.icon, Server);
              const id   = s.slug?.current ?? "";
              const active = activeId === id;
              return (
                <a
                  key={id || s.title} href={`#${id}`}
                  className={`group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    active
                      ? "text-white shadow-lg shadow-violet-500/20 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]"
                      : "text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--bg-card)]"
                  }`}
                >
                  <Icon size={13} />
                  {s.title}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((s, i) => {
            const Icon  = iconFor(s.icon, Server);
            const theme = ACCENT[s.accent ?? "violet"];
            const id    = s.slug?.current ?? "";
            return (
              <motion.div
                key={id || s.title} id={id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="scroll-mt-32"
              >
                <CardSpotlight
                  className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-violet-border)] transition-colors duration-300"
                  color={theme.color}
                  radius={520}
                >
                  <div className="p-7 sm:p-9 md:p-10 relative overflow-hidden">

                    <div className="absolute -top-6 right-4 sm:right-10 text-[160px] sm:text-[210px] font-black opacity-[0.05] dark:opacity-[0.06] select-none leading-none pointer-events-none"
                      style={{ color: theme.color }}>{s.num}</div>

                    <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 items-start">

                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <motion.div
                            whileHover={{ scale: 1.06, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 280 }}
                            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.grad} flex items-center justify-center shadow-xl shadow-violet-500/25`}
                          >
                            <Icon size={24} className="text-white relative z-10" />
                            <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.grad} animate-ping opacity-15`} />
                          </motion.div>
                          <div className="min-w-0">
                            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-1)] tracking-tight">{s.title}</h2>
                            <p className={`text-sm font-semibold bg-gradient-to-r ${theme.grad} bg-clip-text text-transparent`}>{s.tagline}</p>
                          </div>
                        </div>

                        <p className="text-[var(--text-2)] leading-relaxed mb-6">{s.detail ?? s.summary}</p>

                        {s.metric && (
                          <div className="inline-flex items-baseline gap-2 px-3.5 py-2 rounded-xl border mb-6"
                            style={{ background: `${theme.color}10`, borderColor: `${theme.color}33` }}>
                            <span className="text-lg font-black leading-none" style={{ color: theme.color }}>{s.metric.value}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-3)]">{s.metric.label}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-6">
                          {(s.brands ?? []).map((b) => (
                            <span key={b} className="text-xs px-3 py-1 rounded-full bg-[var(--bg-card-2)] border border-[var(--border)] text-[var(--text-2)] font-semibold">{b}</span>
                          ))}
                        </div>

                        <Link
                          href="/contact"
                          className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:opacity-90 transition-all shadow-md shadow-violet-500/20 hover:-translate-y-0.5"
                        >
                          Get a quote
                          <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      <div className="space-y-2.5">
                        {(s.points ?? []).map((pt, idx) => (
                          <motion.div
                            key={pt}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.04 }}
                            className="group/pt flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] hover:border-[var(--accent-violet-border)] hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <div
                              className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-transform group-hover/pt:scale-110"
                              style={{ background: `${theme.color}1f`, color: theme.color }}
                            >
                              <CheckCircle size={12} />
                            </div>
                            <span className="text-sm text-[var(--text-2)] leading-snug">{pt}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
