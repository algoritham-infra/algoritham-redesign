"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Reliable masonry layout-grid.
 *
 * Previous version put framer-motion's tilt animate prop on the SAME node
 * as layoutId. The two animations compete during the shared-layout
 * transition and the card visually "vanishes" on click. Fix: layoutId
 * lives on a clean outer wrapper; hover treatments (image scale, border
 * sweep, caption rise) all happen on independent inner nodes.
 *
 * Click any card → shared-layout transitions it into a centred lightbox.
 * Click the lightbox / backdrop → it returns to the grid position.
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

  return (
    <div className="w-full relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[12rem] sm:auto-rows-[14rem] lg:auto-rows-[16rem]">
        {cards.map((card) => (
          <div key={card.id} className={cn("relative", card.className)}>
            <motion.div
              layoutId={`card-${card.id}`}
              onClick={() => setSelected(card)}
              className="group relative w-full h-full overflow-hidden rounded-2xl cursor-zoom-in border border-[var(--border)] hover:border-[var(--accent-violet-border)] transition-colors duration-300 shadow-sm hover:shadow-xl hover:shadow-violet-500/15"
              transition={{ type: "spring", stiffness: 240, damping: 30 }}
            >
              <GridCardContent card={card} />
            </motion.div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8 pointer-events-none">
              <motion.div
                layoutId={`card-${selected.id}`}
                onClick={() => setSelected(null)}
                className="relative w-full max-w-5xl aspect-[16/10] rounded-3xl overflow-hidden cursor-zoom-out pointer-events-auto shadow-2xl shadow-violet-500/30 border border-white/10"
                transition={{ type: "spring", stiffness: 240, damping: 30 }}
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
                  transition={{ delay: 0.2, duration: 0.4 }}
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

                {/* Explicit close hint */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(null); }}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/55 backdrop-blur text-white flex items-center justify-center hover:bg-black/75 transition-colors"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function GridCardContent({ card }: { card: LayoutCard }) {
  return (
    <>
      {/* Brand-gradient hairline border that fades in on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.55), rgba(6,182,212,0.55))",
          padding: 1,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Image (scales on hover for a lens-like zoom) */}
      <Image
        src={card.thumbnail}
        alt={card.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
      />

      {/* Single bottom gradient — no full image wash */}
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

      {/* Expand affordance, top-right */}
      <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 backdrop-blur text-white text-[10px] font-semibold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
        Open
      </div>
    </>
  );
}
