"use client";
import { motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { LayoutGrid, type LayoutCard } from "@/components/ui/layout-grid";
import { Spotlight } from "@/components/ui/spotlight";
import type { Home, EventPhoto } from "@/sanity/types";

// Fallback paths — order MUST match EVENT_PHOTOS_DEFAULT in defaults.ts.
const FALLBACK_SRCS = [
  "/gallery/rnr-event-2026.jpg",
  "/gallery/adobe-immersion-2026.jpg",
  "/gallery/adobe-ai-briefing.jpg",
  "/gallery/adobe-ai-deep-dive.jpg",
  "/gallery/adobe-team-2026.jpg",
  "/gallery/lts.webp",
  "/gallery/sup.webp",
  "/gallery/mx.webp",
  "/gallery/mix1.webp",
  "/gallery/im.webp",
  "/gallery/amk-team.webp",
];

// Masonry grid placement — 4 cols on desktop. Index here matches photo order.
// First photo = 2x2 hero, second/third = wide and tall accents, rest = 1x1.
const GRID_CLASSES = [
  "md:col-span-2 md:row-span-2",  // 0 — hero
  "md:col-span-2",                // 1 — wide
  "md:row-span-2",                // 2 — tall
  "",
  "",
  "md:col-span-2",                // 5 — wide
  "",
  "",
  "md:row-span-2",                // 8 — tall
  "",
  "md:col-span-2",                // 10 — wide
];

type Props = { home: Home; photos: EventPhoto[] };

export function EventGallery({ home, photos }: Props) {
  const cards: LayoutCard[] = photos.map((p, i) => ({
    id: p._id ?? `ev-${i}`,
    thumbnail: p.image ? urlFor(p.image).width(1600).url() : (FALLBACK_SRCS[i] ?? FALLBACK_SRCS[0]),
    alt:         p.alt,
    title:       p.caption,
    description: p.alt,
    className:   GRID_CLASSES[i] ?? "",
  }));

  return (
    <section id="events" className="relative bg-[var(--bg-card)] py-28 border-t border-[var(--border)] overflow-hidden">

      {/* Atmospheric layers */}
      <Spotlight className="-top-32 left-1/2 -translate-x-1/2 h-[60vh] w-[80vw] opacity-60" fill="#7c3aed" />
      <div
        className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000,transparent_85%)] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(124,58,237,0.07),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_60%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <Camera size={12} />
            {home.eventsEyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-1)] tracking-tight max-w-3xl mx-auto leading-tight">
            {home.eventsHeadline}
          </h2>
          {home.eventsSubhead && (
            <p className="text-[var(--text-2)] text-base sm:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">{home.eventsSubhead}</p>
          )}

          <div className="inline-flex items-center gap-2 mt-7 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-base)]/60 text-[var(--text-3)] text-[11px] font-medium backdrop-blur-sm">
            <Sparkles size={11} className="text-[var(--accent-violet)]" />
            Click any photo to expand
          </div>
        </motion.div>

        <LayoutGrid cards={cards} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-xs text-[var(--text-3)] font-medium">
            Customer-facing events conducted in Mumbai · 2024–2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
