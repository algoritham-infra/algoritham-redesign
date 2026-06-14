"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { Spotlight } from "@/components/ui/spotlight";
import { OrbitRings } from "@/components/ui/orbit-rings";
import type { Home, EventPhoto } from "@/sanity/types";

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

// Bento spans per photo index. Dense flow handles the layout automatically.
const SPANS = ["2x2", "2x1", "1x1", "1x1", "1x1", "2x1", "1x1", "1x1", "1x2", "1x1", "1x1"] as const;
type SpanKey = "1x1" | "2x1" | "1x2" | "2x2";
type Photo = EventPhoto & { _src: string };

type Props = { home: Home; photos: EventPhoto[] };

export function EventGallery({ home, photos }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const resolved: Photo[] = photos.map((p, i) => ({
    ...p,
    _src: p.image ? urlFor(p.image).width(2000).quality(88).url() : (FALLBACK_SRCS[i] ?? FALLBACK_SRCS[0]),
  }));

  const open  = (i: number) => setOpenIdx(i);
  const close = () => setOpenIdx(null);
  const next  = () => setOpenIdx((i) => (i === null ? null : (i + 1) % resolved.length));
  const prev  = () => setOpenIdx((i) => (i === null ? null : (i - 1 + resolved.length) % resolved.length));
  const selected = openIdx !== null ? resolved[openIdx] : null;

  return (
    <section id="events" className="relative bg-[var(--bg-card)] py-28 border-t border-[var(--border)] overflow-hidden">

      {/* Atmospheric layers */}
      <Spotlight className="-top-32 left-1/2 -translate-x-1/2 h-[60vh] w-[80vw] opacity-60" fill="#7c3aed" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] opacity-25 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000,transparent_75%)]">
        <OrbitRings rings={3} />
      </div>
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
              className="!bg-black cursor-pointer shadow-md hover:shadow-2xl hover:shadow-violet-500/30 transition-shadow duration-500"
            >
              <motion.button
                type="button"
                onClick={() => open(i)}
                whileTap={{ scale: 0.98 }}
                className="block w-full h-full relative text-left"
                aria-label={`Open ${photo.caption}`}
              >
                {/* Image fills the cell completely — muted/desaturated at rest,
                    full colour + scale on hover. Classic premium-gallery treatment. */}
                <Image
                  src={photo._src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-all duration-700 ease-out [filter:grayscale(55%)_brightness(0.94)_contrast(1.05)] group-hover:[filter:grayscale(0)_brightness(1)_contrast(1)] group-hover:scale-[1.06]"
                />

                {/* Permanent brand-tint wash on rest — fades out on hover */}
                <div
                  className="absolute inset-0 mix-blend-color opacity-50 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.55), rgba(6,182,212,0.45))" }}
                />

                {/* Hairline brand-gradient border that lights up on hover */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.8), rgba(6,182,212,0.8))",
                    padding: 1.5,
                    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Strong bottom gradient + caption */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-20 text-left translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.18em] uppercase text-cyan-300/95 mb-1 inline-flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-cyan-300/90" />
                    Event
                  </p>
                  <p className="text-white font-bold text-[13px] sm:text-sm leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                    {photo.caption}
                  </p>
                </div>

                {/* Expand chip */}
                <div className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
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

      {/* ── Lightbox — natural aspect, no forced 16:10 ──────── */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl cursor-zoom-out"
            />
            <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8 pointer-events-none">
              <motion.div
                key={openIdx}
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.92, y: 24 }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="relative pointer-events-auto flex flex-col items-center max-w-[95vw] max-h-[92vh]"
              >
                {/* Image element — natural aspect, max constrained to viewport.
                    Using plain img here is intentional: avoids next/image's
                    fixed-aspect requirement so the photo retains its real shape. */}
                <div className="relative max-w-[95vw] max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/40 border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected._src}
                    alt={selected.alt}
                    className="block max-w-[95vw] max-h-[80vh] w-auto h-auto object-contain bg-black"
                  />
                </div>

                {/* Caption strip just below the image (not overlaid — clearer
                    on tall portrait shots) */}
                <div className="mt-4 w-full max-w-3xl text-center px-4">
                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-300/90 mb-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-300/90" />
                    Event · {openIdx !== null ? openIdx + 1 : 0} / {resolved.length}
                  </p>
                  <h3 className="text-white font-black text-xl sm:text-2xl tracking-tight mb-1.5">
                    {selected.caption}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">{selected.alt}</p>
                </div>

                {/* Close button top-right of the image */}
                <button
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/75 backdrop-blur text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Prev / Next buttons */}
                {resolved.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prev(); }}
                      aria-label="Previous"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/65 backdrop-blur text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); next(); }}
                      aria-label="Next"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/65 backdrop-blur text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
