"use client";

/**
 * Concentric orbital rings illustration. Decorative SVG with travelling
 * glow nodes on rotating circles. Drop in as a background layer.
 *
 *   <OrbitRings className="absolute inset-0 opacity-25 pointer-events-none" />
 */
export function OrbitRings({
  className = "",
  rings     = 3,
}: { className?: string; rings?: number }) {
  return (
    <svg
      viewBox="-300 -300 600 600"
      preserveAspectRatio="xMidYMid meet"
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="or-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="or-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>

      {Array.from({ length: rings }, (_, i) => {
        const r = 90 + i * 80;
        const dur = 18 + i * 8;
        const reverse = i % 2 === 1;
        return (
          <g key={i}>
            <circle cx="0" cy="0" r={r} fill="none" stroke="url(#or-grad)" strokeOpacity="0.32" strokeWidth="1" strokeDasharray="3 6" />
            {/* Travelling glow */}
            <g>
              <animateTransform attributeName="transform" type="rotate" from={reverse ? 360 : 0} to={reverse ? 0 : 360} dur={`${dur}s`} repeatCount="indefinite" />
              <circle cx={r} cy="0" r="14" fill="url(#or-glow)" />
              <circle cx={r} cy="0" r="3.5" fill="#a78bfa" />
            </g>
          </g>
        );
      })}

      {/* Centre dot */}
      <circle cx="0" cy="0" r="3" fill="url(#or-grad)" />
      <circle cx="0" cy="0" r="12" fill="none" stroke="url(#or-grad)" strokeOpacity="0.5" />
    </svg>
  );
}
