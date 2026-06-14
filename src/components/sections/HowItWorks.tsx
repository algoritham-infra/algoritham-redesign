"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CircuitLines } from "@/components/ui/circuit-lines";
import { iconFor } from "@/lib/icon-map";
import type { Home, HowItWorksStep } from "@/sanity/types";

const ACCENT: Record<NonNullable<HowItWorksStep["accent"]>, { color: string; grad: string }> = {
  rose:   { color: "var(--accent-rose)",   grad: "from-[#e63946] to-[#c0417a]" },
  violet: { color: "var(--accent-violet)", grad: "from-[#7c3aed] to-[#3b5cc4]" },
  cyan:   { color: "var(--accent-cyan)",   grad: "from-[#3b5cc4] to-[#06b6d4]" },
};

export function HowItWorks({ home, steps }: { home: Home; steps: HowItWorksStep[] }) {
  return (
    <section id="how-it-works" className="relative bg-[var(--bg-card)] py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_80%)]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Decorative circuit lines drift across the section */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000,transparent_85%)]">
        <CircuitLines density={4} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <Sparkles size={12} />{home.howEyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-1)] tracking-tight mb-4">{home.howHeadline}</h2>
          <p className="text-[var(--text-2)] text-lg max-w-xl mx-auto">{home.howSubhead}</p>
        </motion.div>

        <div className="relative">
          <svg
            className="hidden lg:block absolute top-[88px] left-[calc(16.67%+30px)] right-[calc(16.67%+30px)] h-2 z-0 pointer-events-none"
            viewBox="0 0 100 2" preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="hiw-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"  stopColor="#e63946" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <line x1="0" y1="1" x2="100" y2="1" stroke="url(#hiw-line)" strokeWidth="1" strokeDasharray="3 2" />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
            {steps.map((s, i) => {
              const Icon  = iconFor(s.icon, Sparkles);
              const theme = ACCENT[s.accent ?? "violet"];
              return (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative"
                >
                  <CardSpotlight
                    className="rounded-2xl bg-[var(--bg-base)] border border-[var(--border)] hover:border-[var(--accent-violet-border)] transition-colors duration-300 h-full"
                    color={theme.color}
                    radius={400}
                  >
                    <div className="p-7 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-7">
                        <motion.div
                          whileHover={{ scale: 1.08, rotate: -3 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.grad} flex items-center justify-center shadow-xl shadow-violet-500/25`}
                        >
                          <Icon size={22} className="text-white relative z-10" />
                          <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.grad} animate-ping opacity-20`} />
                        </motion.div>
                        <span className="text-5xl font-black text-[var(--text-1)] opacity-[0.06] select-none tracking-tight">{s.num}</span>
                      </div>

                      <h3 className="text-[var(--text-1)] font-black text-2xl mb-1.5 tracking-tight">{s.title}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: theme.color }}>{s.subtitle}</p>
                      <p className="text-[var(--text-2)] text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>

                      <div className="flex items-center justify-between pt-5 border-t border-[var(--border)]">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-[var(--text-3)] font-medium">{s.detail}</span>
                        </span>
                        {i < steps.length - 1 && <ArrowRight size={14} className="text-[var(--text-3)] hidden lg:block" />}
                      </div>
                    </div>
                  </CardSpotlight>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
