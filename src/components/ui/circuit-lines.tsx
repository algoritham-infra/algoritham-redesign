"use client";
import { motion } from "framer-motion";

/**
 * Animated circuit/connection illustration. SVG paths with marching dashes
 * + travelling glow packets. Drop into any section as an absolute-positioned
 * decorative layer.
 *
 *   <CircuitLines className="absolute inset-0 opacity-40 pointer-events-none" />
 */
export function CircuitLines({
  className = "",
  density   = 5,
}: { className?: string; density?: number }) {
  // Deterministic seed so the pattern is stable across renders.
  const lines = Array.from({ length: density }, (_, i) => {
    const y = 60 + (i * 480) / density;
    return {
      id: `line-${i}`,
      d:  `M -20 ${y} Q 200 ${y + (i % 2 === 0 ? -50 : 50)} 480 ${y} T 1020 ${y}`,
      dur: 6 + i,
      delay: i * 0.6,
    };
  });

  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cl-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="20%"  stopColor="#7c3aed" stopOpacity="0.6" />
          <stop offset="80%"  stopColor="#06b6d4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cl-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>

      {lines.map(({ id, d, dur, delay }) => (
        <g key={id}>
          {/* Base line */}
          <path d={d} fill="none" stroke="url(#cl-grad)" strokeWidth="1" strokeOpacity="0.35" />
          {/* Marching dashes */}
          <path d={d} fill="none" stroke="url(#cl-grad)" strokeWidth="1.5" strokeDasharray="6 14">
            <animate attributeName="stroke-dashoffset" from="0" to="-200" dur={`${dur}s`} repeatCount="indefinite" />
          </path>
          {/* Travelling glow packet */}
          <motion.circle
            r="3.5"
            fill="#a78bfa"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
          >
            <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} />
          </motion.circle>
        </g>
      ))}

      {/* Endpoint nodes */}
      {lines.map(({ id }, i) => (
        <g key={`node-${id}`}>
          <circle cx="-20" cy={60 + (i * 480) / density} r="14" fill="url(#cl-node)" opacity="0.4" />
          <circle cx="1020" cy={60 + (i * 480) / density} r="14" fill="url(#cl-node)" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
