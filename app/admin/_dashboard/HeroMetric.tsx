"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Big hero metric card with count-up number, a drifting gradient orb, and a
 * subtle sparkline ribbon along the bottom. Intentionally restrained — one
 * statement, one feeling.
 */
export default function HeroMetric({
  label,
  value,
  caption,
  trend,
  delta,
}: {
  label: string;
  value: number;
  caption?: string;
  trend?: number[];
  delta?: { value: number; positive: boolean };
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      if (played.current) return;
      played.current = true;
      if (reduce) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / dur));
        const eased = 1 - Math.pow(1 - t, 4);
        setDisplay(Math.round(value * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-xl sm:p-8"
      style={{ animation: "admin-fade-up 0.7s 0.05s ease-out both" }}
    >
      {/* Drifting orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, #3FC9B4 0%, transparent 70%)",
          animation: "hero-orb 8s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
          animation: "hero-orb 12s -2s ease-in-out infinite reverse",
        }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
          {label}
        </div>
        {delta && (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold tabular-nums"
            style={{
              backgroundColor: delta.positive ? "rgba(63,201,180,0.12)" : "rgba(244,63,94,0.12)",
              color: delta.positive ? "#3FC9B4" : "#fb7185",
            }}
          >
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {delta.positive ? <path d="M3 8l3-4 3 4" /> : <path d="M3 4l3 4 3-4" />}
            </svg>
            {delta.value}%
          </span>
        )}
      </div>

      <div className="relative mt-6 flex items-baseline gap-3">
        <span
          className="font-semibold tabular-nums leading-none"
          style={{
            fontSize: "clamp(72px, 11vw, 128px)",
            backgroundImage: "linear-gradient(140deg, #ffffff 0%, #3FC9B4 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.04em",
            filter: "drop-shadow(0 0 24px rgba(63,201,180,0.3))",
          }}
        >
          {String(display).padStart(2, "0")}
        </span>
        <span className="pb-2 text-base font-medium text-white/55 sm:text-lg">
          {caption}
        </span>
      </div>

      {trend && trend.length > 1 && (
        <div className="relative -mx-2 mt-4">
          <Ribbon points={trend} />
        </div>
      )}

      <style jsx>{`
        @keyframes hero-orb {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(10px, -8px, 0) scale(1.15); }
        }
      `}</style>
    </div>
  );
}

function Ribbon({ points }: { points: number[] }) {
  const W = 400;
  const H = 56;
  const max = Math.max(1, ...points);
  const step = points.length === 1 ? 0 : W / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = H - (p / max) * (H - 6) - 3;
    return [x, y] as const;
  });
  const lineD = coords
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(" ");
  const areaD = `${lineD} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-14 w-full">
      <defs>
        <linearGradient id="hero-rib" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3FC9B4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3FC9B4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#hero-rib)" />
      <path
        d={lineD}
        fill="none"
        stroke="#3FC9B4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
          animation: "hero-ribbon-draw 1.8s 0.3s ease-out forwards",
        }}
      />
      {coords.length > 0 && (
        <circle
          cx={coords[coords.length - 1][0]}
          cy={coords[coords.length - 1][1]}
          r="3"
          fill="#3FC9B4"
          style={{ filter: "drop-shadow(0 0 6px #3FC9B4)" }}
        />
      )}
      <style>{`
        @keyframes hero-ribbon-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
