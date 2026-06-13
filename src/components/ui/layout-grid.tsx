"use client";
import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Polished masonry layout grid.
 * - Each card gets a subtle 3D tilt on cursor move + gradient border on hover.
 * - Click → expands into a centred lightbox via shared-layout animation.
 * - Single-bottom gradient for caption clarity (no full overlay washing the image).
 */
export type LayoutCard = {
  id: number | string;
  thumbnail: string;
  alt: string;
  title: string;
  description?: string;
  className?: string;
};

export function LayoutGrid({ cards }: { cards: LayoutCard[] }) {
  const [selected, setSelected] = useState<LayoutCard | null>(null);
  const [last,     setLast]     = useState<LayoutCard | null>(null);

  const open  = (c: LayoutCard) => { setLast(c); setSelected(c); };
  const close = () => setSelected(null);

  return (
    <div className="w-full relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[12rem] sm:auto-rows-[14rem] lg:auto-rows-[16rem]">
        {cards.map((card) => (
          <TiltCard key={card.id} card={card} onOpen={() => open(card)} selected={selected?.id === card.id} />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8 pointer-events-none">
              <motion.div
                layoutId={`card-${selected.id}`}
                onClick={close}
                className="relative w-full max-w-5xl aspect-[16/10] rounded-3xl overflow-hidden cursor-zoom-out pointer-events-auto shadow-2xl shadow-violet-500/20"
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
              >
                <Image
                  src={selected.thumbnail}
                  alt={selected.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.4 }}
                  className="absolute inset-x-0 bottom-0 p-6 sm:p-10 bg-gradient-to-t from-black/95 via-black/55 to-transparent"
                >
                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-300/90 mb-3">
                    <span className="w-1 h-1 rounded-full bg-cyan-300/90" />
                    Event
                  </p>
                  <h3 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3">
                    {selected.title}
                  </h3>
                  {selected.description && (
                    <p className="text-white/80 text-sm sm:text-base max-w-3xl leading-relaxed">{selected.description}</p>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Hidden carrier for the shared-layout return animation */}
      {last && selected === null && (
        <motion.div layoutId={`card-${last.id}`} style={{ display: "none" }} aria-hidden />
      )}
    </div>
  );
}

function TiltCard({
  card, selected, onOpen,
}: { card: LayoutCard; selected: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    // Tight tilt so the image doesn't feel rubbery
    setTilt({ rx: -y * 6, ry: x * 6 });
  }

  return (
    <div ref={ref} className={cn("relative", card.className)} style={{ perspective: 1100 }}>
      <motion.div
        onClick={onOpen}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        layoutId={`card-${card.id}`}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className={cn(
          "group relative w-full h-full overflow-hidden rounded-2xl cursor-zoom-in border border-[var(--border)] hover:border-[var(--accent-violet-border)] transition-colors duration-300 shadow-sm hover:shadow-xl hover:shadow-violet-500/15",
          selected && "z-50",
        )}
      >
        {/* Brand gradient hairline border that fades in on hover */}
        <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.45), rgba(6,182,212,0.45))",
            padding: 1,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <Image
          src={card.thumbnail}
          alt={card.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Single bottom gradient — only as much overlay as the caption needs */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 z-10 text-left translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.18em] uppercase text-cyan-300/95 mb-1 inline-flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-cyan-300/90" />
            Event
          </p>
          <p className="text-white font-bold text-[13px] sm:text-sm leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {card.title}
          </p>
        </div>

        {/* Subtle "expand" affordance, top-right, fades in on hover */}
        <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 backdrop-blur text-white text-[10px] font-semibold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          Open
        </div>
      </motion.div>
    </div>
  );
}
