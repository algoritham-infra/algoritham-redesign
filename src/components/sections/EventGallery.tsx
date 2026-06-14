"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, Sparkles, Maximize2, X } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { Spotlight } from "@/components/ui/spotlight";
import { OrbitRings } from "@/components/ui/orbit-rings";
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

// Bento spans per photo index. Mix of 2x2 hero, 2x1 wide, 1x2 tall, 1x1.
const SPANS = [
  "2x2", "2x1", "1x2", "1x1",
  "1x1", "2x1", "1x1", "1x1",
  "1x2", "1x1", "2x1",
] as const;

type SpanKey = "1x1" | "2x1" | "1x2" | "2x2";
type Photo = EventPhoto & { _src: string };

type Props = { home: Home; photos: EventPhoto[] };

export function EventGallery({ home, photos }: Props) {
  const [selected, setSelected] = useState<Photo | null>(null);

  const resolved: Photo[] = photos.map((p, i) => ({
    ...p,
    _src: p.image ? urlFor(p.image).width(1600).url() : (FALLBACK_SRCS[i] ?? FALLBACK_SRCS[0]),
  }));

  return (
    <section id="events" className="relative bg-[var(--bg-card)] py-28 border-t border-[var(--border)] overflow-hidden">

      {/* Atmospheric layers */}
      <Spotlight className="-top-32 left-1/2 -translate-x-1/2 h-[60vh] w-[80vw] opacity-60" fill="#7c3aed" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] opacity-25 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000,transparent_75%)]">
        <OrbitRings rings={3} />
      </div>
      <div
        className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000,transparent_85%)] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(124,58,237,0.07),transparent)] pointer-events-none" />

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

        <BentoGrid>
          {resolved.map((photo, i) => (
            <BentoItem
              key={(photo._id ?? `ev-${i}`)}
              span={(SPANS[i] ?? "1x1") as SpanKey}
              className="bg-[var(--bg-base)] cursor-pointer hover:shadow-xl hover:shadow-violet-500/15"
            >
              <motion.button
                type="button"
                onClick={() => setSelected(photo)}
                whileTap={{ scale: 0.98 }}
                className="block w-full h-full relative text-left"
                aria-label={`Open ${photo.caption}`}
              >
                {/* Brand gradient hairline border — fades in on hover */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.55), rgba(6,182,212,0.55))",
                    padding: 1,
                    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                <Image
                  src={photo._src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                {/* Caption gradient — only bottom 40% */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Caption text */}
                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 z-10 text-left translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.18em] uppercase text-cyan-300/95 mb-1 inline-flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-cyan-300/90" />
                    Event
                  </p>
                  <p className="text-white font-bold text-[13px] sm:text-sm leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                    {photo.caption}
                  </p>
                </div>

                {/* Expand chip */}
                <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 backdrop-blur text-white text-[10px] font-semibold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <Maximize2 size={10} /> Open
                </div>
              </motion.button>
            </BentoItem>
          ))}
        </BentoGrid>

        <p className="text-center text-xs text-[var(--text-3)] font-medium mt-14">
          Customer-facing events conducted in Mumbai · 2024–2026
        </p>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────
          Plain fade-in + scale, NOT shared layout. Avoids the previous
          layoutId/animate conflict that made cards vanish on click. */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md cursor-zoom-out"
            />
            <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.92, y: 16 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="relative w-full max-w-5xl aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/30 border border-white/10 pointer-events-auto"
              >
                <Image
                  src={selected._src}
                  alt={selected.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 bg-gradient-to-t from-black/95 via-black/55 to-transparent">
                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-300/90 mb-3">
                    <span className="w-1 h-1 rounded-full bg-cyan-300/90" />
                    Event
                  </p>
                  <h3 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3">
                    {selected.caption}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base max-w-3xl leading-relaxed">{selected.alt}</p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/55 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
