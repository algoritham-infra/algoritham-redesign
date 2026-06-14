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

// Bento spans per photo index.
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
    _src: p.image ? urlFor(p.image).width(1800).quality(85).url() : (FALLBACK_SRCS[i] ?? FALLBACK_SRCS[0]),
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
              className="!bg-black/95 cursor-pointer shadow-md hover:shadow-2xl hover:shadow-violet-500/25 transition-shadow duration-500"
            >
              <motion.button
                type="button"
                onClick={() => setSelected(photo)}
                whileTap={{ scale: 0.98 }}
                className="block w-full h-full relative text-left overflow-hidden"
                aria-label={`Open ${photo.caption}`}
              >
                {/* ── Layer 1: blurred backdrop fills the cell so there's no
                     empty letterbox area when the foreground is contained ── */}
                <div className="absolute inset-0 scale-110">
                  <Image
                    src={photo._src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover blur-2xl brightness-50 saturate-150 scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* ── Layer 2: actual image, contained so nothing is cropped ── */}
                <Image
                  src={photo._src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-2 sm:p-3 transition-all duration-700 ease-out [filter:saturate(0.92)_brightness(0.96)] group-hover:[filter:saturate(1.15)_brightness(1)] group-hover:scale-[1.03] drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] relative z-10"
                />

                {/* ── Layer 3: brand-gradient hairline border that lights up
                     on hover (kept above the image so the frame is visible) ── */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.75), rgba(6,182,212,0.75))",
                    padding: 1.5,
                    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* ── Layer 4: caption bar at bottom — translucent dark glass ── */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 z-30 bg-gradient-to-t from-black/95 via-black/65 to-transparent pt-12">
                  <p className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.18em] uppercase text-cyan-300/95 mb-1 inline-flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-cyan-300/90" />
                    Event
                  </p>
                  <p className="text-white font-bold text-[13px] sm:text-sm leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                    {photo.caption}
                  </p>
                </div>

                {/* ── Layer 5: expand chip ── */}
                <div className="absolute top-3 right-3 z-30 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
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

      {/* ── Lightbox — full image visible via object-contain ── */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl cursor-zoom-out"
            />
            <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                animate={{ opacity: 1, scale: 1,   y: 0  }}
                exit={{    opacity: 0, scale: 0.9, y: 24 }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="relative w-full max-w-6xl pointer-events-auto"
              >
                {/* Frame: glass card with image + caption */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/30 border border-white/10 bg-black/95">
                  {/* Blurred backdrop in lightbox too */}
                  <div className="absolute inset-0 scale-110">
                    <Image
                      src={selected._src}
                      alt=""
                      aria-hidden="true"
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover blur-3xl brightness-50 saturate-150"
                    />
                  </div>

                  {/* Actual image — fully contained, never cropped */}
                  <div className="relative aspect-[16/10] flex items-center justify-center p-4 sm:p-6">
                    <Image
                      src={selected._src}
                      alt={selected.alt}
                      fill
                      priority
                      sizes="100vw"
                      className="object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  <div className="relative p-6 sm:p-8 bg-gradient-to-t from-black/95 via-black/70 to-black/0">
                    <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-300/90 mb-3">
                      <span className="w-1 h-1 rounded-full bg-cyan-300/90" />
                      Event
                    </p>
                    <h3 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-2">
                      {selected.caption}
                    </h3>
                    <p className="text-white/75 text-sm sm:text-base max-w-3xl leading-relaxed">{selected.alt}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/70 backdrop-blur text-white flex items-center justify-center hover:bg-black/90 transition-colors"
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
