"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Server, Zap, ArrowUpRight, ShieldCheck } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { SkeletonMap } from "@/components/ui/skeleton";
import { iconFor } from "@/lib/icon-map";
import type { CoverageNode as CoverageNodeType, InfrastructureFeature, SiteSettings } from "@/sanity/types";
import type { CoverageNode as MapCoverageNode } from "@/components/ui/india-coverage-map";

const IndiaCoverageMap = dynamic(
  () => import("@/components/ui/india-coverage-map").then(m => m.IndiaCoverageMap),
  { ssr: false, loading: () => <SkeletonMap /> },
);

type Props = {
  site: SiteSettings;
  features: InfrastructureFeature[];
  coverage: CoverageNodeType[];
};

const ACCENT_COLOR: Record<NonNullable<InfrastructureFeature["accent"]>, string> = {
  violet: "var(--accent-violet)",
  cyan:   "var(--accent-cyan)",
  rose:   "var(--accent-rose)",
};

export function Infrastructure({ site, features, coverage }: Props) {
  const yearsValue = parseInt(site.yearsInBusiness?.replace(/\D/g, "") || "15", 10);
  const uptimeValue = parseFloat(site.uptimeSLA?.replace(/[^0-9.]/g, "") || "99.99");
  const carriersValue = parseInt(site.carriers?.replace(/\D/g, "") || "40", 10);

  const metrics = [
    { value: yearsValue,    suffix: "+",  label: "Years operating" },
    { value: Math.floor(uptimeValue), suffix: "%",  label: "Uptime SLA" },
    { value: carriersValue, suffix: "+",  label: "Telecom carriers" },
    { value: 24,            suffix: "/7", label: "NOC monitoring" },
  ];

  const mapNodes: MapCoverageNode[] = coverage.map((c) => ({
    city: c.city, x: c.x ?? 0, y: c.y ?? 0,
    primary: c.primary, carriers: c.carriers, pop: c.pop,
  }));

  return (
    <section id="infrastructure" className="bg-[var(--bg-base)] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest mb-4 inline-flex items-center gap-2">
            <Server size={12} /> Infrastructure
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-1)] tracking-tight mb-4 leading-[1.05]">
            Nationwide. <span className="brand-gradient animate-gradient">By default.</span>
          </h2>
          <p className="text-[var(--text-2)] text-lg leading-relaxed">
            Dedicated data center suites, fully enclosed ISP-private facilities, and a carrier network spanning {site.carriers ?? "40+"} providers across {coverage.length} metros.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {metrics.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <CardSpotlight className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]" radius={260}>
                <div className="p-5 text-center">
                  <div className="text-3xl md:text-4xl font-black brand-gradient mb-1">
                    <AnimatedCounter end={value} suffix={suffix} />
                  </div>
                  <div className="text-xs text-[var(--text-3)] font-semibold tracking-wide">{label}</div>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <CardSpotlight className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] h-full" radius={460}>
              <div className="p-6 sm:p-8 h-full flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-[var(--text-1)] font-bold text-xl mb-1.5 flex items-center gap-2">
                      <Zap size={16} className="text-[var(--accent-violet)]" />
                      Data Center Capabilities
                    </h3>
                    <p className="text-sm text-[var(--text-3)]">Tier 3+ certified — purpose-built for enterprise workloads.</p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--accent-violet-bg)] text-[var(--accent-violet)] border border-[var(--accent-violet-border)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-purple)] animate-pulse" />
                    Operational
                  </span>
                </div>

                {/* Two groups stacked vertically; items within each group laid out
                    horizontally (1 col on mobile → 3 cols from md). Map on the
                    right stays untouched because each row is short. */}
                <div className="flex-1 space-y-6">
                  {[
                    { id: "hypervisor", label: "Hypervisor & Virtualization", accent: "var(--accent-violet)" },
                    { id: "facility",   label: "Facility & Operations",        accent: "var(--accent-cyan)"   },
                  ].map(({ id, label, accent }) => {
                    const group = features.filter((f) => (f.category ?? "facility") === id);
                    if (group.length === 0) return null;
                    return (
                      <div key={id}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-1 h-3.5 rounded-full" style={{ background: accent }} />
                          <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                            {label}
                          </h4>
                          <span className="flex-1 h-px bg-[var(--border)]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {group.map((f, i) => {
                            const Icon  = iconFor(f.icon, ShieldCheck);
                            const color = ACCENT_COLOR[f.accent ?? "violet"];
                            return (
                              <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative p-4 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] overflow-hidden hover:border-[var(--accent-violet-border)] hover:-translate-y-0.5 transition-all duration-200"
                              >
                                <div
                                  className="absolute top-0 left-0 right-0 h-px opacity-30 group-hover:opacity-100 transition-opacity"
                                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                                />
                                <div
                                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none blur-2xl"
                                  style={{ background: `radial-gradient(circle, ${color}1f, transparent 70%)` }}
                                />
                                <div className="relative">
                                  <div className="flex items-start justify-between mb-3">
                                    <div
                                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                                      style={{ background: `${color}22`, color, boxShadow: `inset 0 0 0 1px ${color}25` }}
                                    >
                                      <Icon size={19} />
                                    </div>
                                    {f.stat && (
                                      <div className="text-right">
                                        <div className="text-base font-black leading-none" style={{ color }}>{f.stat}</div>
                                        <div className="text-[9px] font-semibold uppercase tracking-widest text-[var(--text-3)] mt-0.5">{f.statLabel}</div>
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-[var(--text-1)] text-sm font-bold leading-tight mb-1">{f.title}</p>
                                  <p className="text-[var(--text-3)] text-[12px] leading-snug">{f.desc}</p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-5 border-t border-[var(--border)]">
                  {[
                    { label: "Power",   pct: 100, solid: "#7c3aed" },
                    { label: "Network", pct: 100, solid: "#06b6d4" },
                    { label: "Cooling", pct: 99,  solid: "#e63946" },
                  ].map(({ label, pct, solid }, i) => (
                    <div key={label} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-wider">{label}</span>
                        <span className="text-[11px] font-bold" style={{ color: solid }}>{pct}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[var(--bg-card-2)] overflow-hidden border border-[var(--border)]">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 + i * 0.15 }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${solid}, ${solid}cc)`,
                            boxShadow: `0 0 8px ${solid}66`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardSpotlight>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <CardSpotlight className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] h-full" radius={420}>
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[var(--text-1)] font-bold text-lg">Service Coverage</h3>
                  <span className="flex items-center gap-1.5 text-[11px] text-green-500 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </span>
                </div>
                <p className="text-xs text-[var(--text-3)] mb-3">Hover any metro to view details.</p>
                <div className="flex-1 relative -mx-2">
                  <IndiaCoverageMap nodes={mapNodes} />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-[var(--border)]">
                  {[
                    { v: `${mapNodes.length}`, l: "Metros covered" },
                    { v: `${mapNodes.reduce((s, n) => s + (n.carriers ?? 0), 0)}+`, l: "Carrier circuits" },
                    { v: "1.2B+", l: "Population reach" },
                  ].map(({ v, l }) => (
                    <div key={l} className="text-center px-1">
                      <div className="text-base sm:text-lg font-black brand-gradient leading-tight">{v}</div>
                      <div className="text-[9px] sm:text-[10px] text-[var(--text-3)] uppercase tracking-widest font-semibold">{l}</div>
                    </div>
                  ))}
                </div>

                <a
                  href="/contact"
                  className="group mt-4 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--accent-violet)] hover:text-[var(--brand-purple)] transition-colors"
                >
                  Request coverage in your city
                  <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </CardSpotlight>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
