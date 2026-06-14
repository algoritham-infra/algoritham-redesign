"use client";
import { ReactNode } from "react";

export function BentoGrid({
  children,
  className = "",
}: { children: ReactNode; className?: string }) {
  // grid-flow-row-dense lets smaller items backfill gaps left by taller/wider
  // ones — eliminates the empty cells the previous (row-only flow) had.
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[12rem] sm:auto-rows-[15rem] lg:auto-rows-[16rem] gap-3 sm:gap-4 grid-flow-row-dense ${className}`}>
      {children}
    </div>
  );
}

export function BentoItem({
  children,
  className = "",
  span = "1x1",
}: {
  children: ReactNode;
  className?: string;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
}) {
  const spanMap: Record<string, string> = {
    "1x1": "",
    "2x1": "sm:col-span-2",
    "1x2": "sm:row-span-2",
    "2x2": "sm:col-span-2 sm:row-span-2",
  };

  return (
    <div
      className={`group relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden hover:border-[var(--accent-violet-border)] transition-all duration-300 ${spanMap[span]} ${className}`}
    >
      {children}
    </div>
  );
}
