"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { SkeletonGlobe } from "@/components/ui/skeleton";
import { iconFor } from "@/lib/icon-map";
import type { Home as HomeContent } from "@/sanity/types";

// Heavy canvas component — lazy-loaded so it never blocks LCP.
const WireframeGlobe = dynamic(
  () => import("@/components/ui/wireframe-globe").then((m) => m.WireframeGlobe),
  { ssr: false, loading: () => <SkeletonGlobe /> },
);

type Props = { home: HomeContent; uptimeSLA: string };

const COLOR_MAP: Record<string, string> = {
  purple: "var(--accent-violet)",
  rose:   "var(--accent-rose)",
  cyan:   "var(--accent-cyan)",
};

/**
 * Aceternity-inspired hero.
 *
 * Stack (centered, top → bottom):
 *   1. HoverBorderGradient pill badge with rotating brand-gradient border
 *   2. Two-line headline — plain bold line + gradient-sweep line
 *   3. Short single-line description
 *   4. Primary gradient CTA + secondary outline CTA, side-by-side
 *   5. Trust-signal strip (icons + tiny labels)
 *
 * Background:
 *   - WireframeGlobe (the "wavy thing") at theme-driven opacity
 *   - Subtle dot grid faded toward the centre (focus on content)
 *   - Top-centre Spotlight beam
 *   - Edge vignette so corners fade into the next section
 */
export function Hero({ home, uptimeSLA }: Props) {
  const headlineParts = [
    home.heroHeadlinePre,
    home.heroHeadlineGradient,
    home.heroHeadlinePost,
  ].filter((s): s is string => Boolean(s && s.trim()));

  const badges = (home.heroBadges ?? []).map((b) => ({
    ...b,
    label: b.label.replace("{uptime}", uptimeSLA),
    Icon:  iconFor(b.icon, Sparkles),
  }));

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--bg-base)]">

      {/* ── Background layer 1: wireframe globe ───────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: "var(--globe-opacity)" }}
      >
        <WireframeGlobe className="w-full h-full" />
      </div>

      {/* ── Background layer 2: dot grid, faded to centre ── */}
      <div
        className="absolute inset-0 z-[1] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_20%,#000_85%)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Background layer 3: top spotlight ────────────── */}
      <Spotlight
        className="-top-32 left-1/2 -translate-x-1/2 h-[85vh] w-[80vw]"
        fill="#7c3aed"
      />

      {/* ── Background layer 4: edge vignette ────────────── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, var(--hero-edge) 100%)",
        }}
      />

      {/* ── Foreground content ───────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 pt-36 sm:pt-40 pb-28 flex flex-col items-center text-center">

        {/* (1) Badge */}
        {home.heroEyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-10"
          >
            <HoverBorderGradient
              as="a"
              href="/about"
              containerClassName="text-xs"
              className="flex items-center gap-2 px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[var(--text-1)]"
            >
              <Sparkles size={12} className="text-[var(--accent-violet)]" />
              <span>{home.heroEyebrow}</span>
              <ArrowRight size={12} className="text-[var(--text-3)]" />
            </HoverBorderGradient>
          </motion.div>
        )}

        {/* (2) Headline — block-stacked. Gradient sweep sits on the
            middle phrase; pre/post stay plain bold. */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-black tracking-tight leading-[1.02] mb-7 w-full text-[var(--text-1)]"
        >
          {home.heroHeadlinePre && (
            <span className="block text-4xl sm:text-6xl lg:text-7xl xl:text-[88px]">
              {home.heroHeadlinePre}
            </span>
          )}
          {home.heroHeadlineGradient && (
            <span className="block text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] brand-gradient animate-gradient mt-1">
              {home.heroHeadlineGradient}
            </span>
          )}
          {home.heroHeadlinePost && (
            <span className="block text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] mt-1">
              {home.heroHeadlinePost}
            </span>
          )}
          {/* Fallback if all three are empty */}
          {headlineParts.length === 0 && (
            <span className="block text-4xl sm:text-6xl lg:text-7xl">Algoritham Infrastructure.</span>
          )}
        </motion.h1>

        {/* (3) Description */}
        {home.heroBrandLine && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="text-[var(--text-2)] text-base sm:text-lg leading-relaxed max-w-2xl mb-10"
          >
            {home.heroBrandLine}
          </motion.p>
        )}

        {/* Long subhead — only if editor adds one */}
        {home.heroSubhead && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="text-[var(--text-3)] text-sm sm:text-base leading-relaxed max-w-xl -mt-4 mb-10"
          >
            {home.heroSubhead}
          </motion.p>
        )}

        {/* (4) CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          {home.heroPrimaryCta && (
            <a
              href={home.heroPrimaryCta.href}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-xl shadow-violet-500/25 hover:shadow-violet-500/45 hover:-translate-y-0.5 transition-all duration-200"
            >
              {home.heroPrimaryCta.label}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          {home.heroSecondaryCta && (
            <a
              href={home.heroSecondaryCta.href}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-1)] hover:border-[var(--accent-violet-border)] hover:bg-[var(--bg-card-2)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <Phone size={14} className="text-[var(--accent-violet)]" />
              {home.heroSecondaryCta.label}
            </a>
          )}
        </motion.div>

        {/* (5) Trust-signal strip */}
        {badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-[var(--text-3)]"
          >
            {badges.map(({ Icon, label, color }, i) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Icon
                  size={12}
                  style={{ color: COLOR_MAP[color ?? "purple"] }}
                />
                <span className="text-[var(--text-2)]">{label}</span>
                {i < badges.length - 1 && (
                  <span className="ml-4 opacity-30 hidden sm:inline">·</span>
                )}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Bottom fade into the next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 pointer-events-none z-[3]"
        style={{
          background: "linear-gradient(to top, var(--bg-base), transparent)",
        }}
      />
    </section>
  );
}
