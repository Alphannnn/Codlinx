"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Counter from "./Counter";
import Magnetic from "./Magnetic";

const ACCENT = "#3FC9B4";

const TITLE_WORDS_LINE_1 = ["Software", "that", "moves"];
const TITLE_WORDS_LINE_2 = ["businesses", "forward."];

const METRICS = [
  { value: "120+", label: "Products shipped" },
  { value: "40+", label: "Engineers & designers" },
  { value: "12", label: "Industries served" },
  { value: "4.9/5", label: "Client rating" },
];

const CLIENT_LOGOS = [
  "Traded",
  "Zentap",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // Mouse-parallax: subtly translate background layers as cursor moves.
  // Disabled on touch + reduced-motion.
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(hover: none)").matches ||
        "ontouchstart" in window);
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx = (e.clientX / w - 0.5) * 2;
      my = (e.clientY / h - 0.5) * 2;
    };

    const tick = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      if (gridRef.current)
        gridRef.current.style.transform = `translate3d(${cx * 14}px, ${cy * 10}px, 0)`;
      if (blob1Ref.current)
        blob1Ref.current.style.transform = `translate3d(${-50 + cx * -30}%, ${cy * -18}px, 0) translateX(${cx * -30}px)`;
      if (blob2Ref.current)
        blob2Ref.current.style.transform = `translate3d(${cx * 36}px, ${cy * 24}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Scroll parallax: when the hero scrolls out, soften and drift the bg.
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, rect.height))
      );
      if (blob1Ref.current) {
        blob1Ref.current.style.opacity = `${0.3 * (1 - progress * 0.6)}`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-black text-white"
    >
      <div
        ref={gridRef}
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 75%)",
          willChange: "transform",
        }}
      />

      <div
        ref={blob1Ref}
        aria-hidden
        className="absolute left-1/2 top-[-220px] -z-10 h-[560px] w-[1100px] -translate-x-1/2 rounded-full blur-[120px] opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${ACCENT} 0%, rgba(63,201,180,0.2) 35%, transparent 70%)`,
          willChange: "transform, opacity",
        }}
      />
      <div
        ref={blob2Ref}
        aria-hidden
        className="absolute -bottom-40 right-[-120px] -z-10 h-[520px] w-[520px] rounded-full blur-[110px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(120,80,255,0.6) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />

      <div
        aria-hidden
        className={`pointer-events-none absolute right-[8%] top-[22%] -z-10 hidden h-3 w-3 rounded-full lg:block transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: ACCENT,
          boxShadow: `0 0 24px ${ACCENT}`,
          animation: "codlinx-float 6s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute left-[6%] top-[55%] -z-10 hidden h-2 w-2 rounded-full lg:block transition-all duration-1000 delay-200 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "white",
          boxShadow: "0 0 16px rgba(255,255,255,0.6)",
          animation: "codlinx-float 8s ease-in-out infinite reverse",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 lg:pb-32 lg:pt-28">
        <div className="flex flex-col items-center text-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
            </span>
            Now taking new engagements for Q3
            <svg
              viewBox="0 0 16 16"
              className="h-3 w-3 text-white/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 3l5 5-5 5" />
            </svg>
          </span>

          <h1 className="codlinx-hero-h1 mt-7 max-w-5xl text-balance text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl xl:text-[88px]">
            <span className="block">
              {TITLE_WORDS_LINE_1.map((w, i) => (
                <span
                  key={i}
                  className="codlinx-word-mask"
                  style={{ animationDelay: `${120 + i * 80}ms` }}
                >
                  <span className="codlinx-word-inner">{w}</span>
                </span>
              ))}
            </span>
            <span className="codlinx-hero-line2 relative mt-1 block">
              <span
                className={`codlinx-gradient-text ${mounted ? "is-shown" : ""}`}
                style={{
                  backgroundImage: `linear-gradient(120deg, ${ACCENT} 0%, #7FF0DC 45%, #ffffff 100%)`,
                }}
              >
                {TITLE_WORDS_LINE_2.join(" ")}
              </span>
              <svg
                aria-hidden
                viewBox="0 0 600 24"
                className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full sm:-bottom-2"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 18 Q150 4 300 14 T598 12"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.7"
                  strokeDasharray="700"
                  strokeDashoffset={mounted ? 0 : 700}
                  style={{
                    transition:
                      "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1) 700ms",
                  }}
                />
              </svg>
            </span>
          </h1>

          <p
            className={`mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg transition-all duration-700 delay-200 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            Codlinx is a full-stack software studio. We design, engineer, and
            scale digital products — from ambitious zero-to-one launches to
            enterprise platforms that ship every week.
          </p>

          <div
            className={`mt-10 flex flex-col items-center gap-3 sm:flex-row transition-all duration-700 delay-300 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <Magnetic strength={0.32} innerStrength={0.5}>
              <Link
                href="/contact"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="magnetic-inner relative inline-flex items-center gap-2">
                  Start a Project
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </Magnetic>
            <Link
              href="/work/case-studies"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06]"
            >
              <span
                className="grid h-5 w-5 place-items-center rounded-full"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              >
                <svg
                  viewBox="0 0 12 12"
                  className="h-2.5 w-2.5 text-black"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M3 2l7 4-7 4z" />
                </svg>
              </span>
              See our work
            </Link>
          </div>

          <p
            className={`mt-10 text-xs uppercase tracking-[0.24em] text-white/40 transition-opacity duration-700 delay-500 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            Trusted by teams from startups to the Fortune 500
          </p>
          <div
            className={`mt-5 flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-4 transition-opacity duration-700 delay-500 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            {CLIENT_LOGOS.map((name, i) => (
              <span
                key={name}
                className="text-sm font-semibold tracking-wider text-white/40 grayscale transition-all duration-300 hover:scale-110 hover:text-white/85 hover:grayscale-0"
                style={{
                  animation: `codlinx-logo-drift ${5 + (i % 3)}s ease-in-out ${i * 0.35}s infinite`,
                  display: "inline-block",
                }}
              >
                {name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md sm:grid-cols-4 transition-all duration-700 delay-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {METRICS.map((m, i) => (
            <MetricCard key={m.label} m={m} index={i} />
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <style jsx global>{`
        @keyframes codlinx-float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-18px) translateX(8px); }
        }
        @keyframes codlinx-gradient-pan {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes codlinx-word-rise {
          from { transform: translate3d(0, 110%, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        .codlinx-word-mask {
          display: inline-block;
          overflow: hidden;
          line-height: 1.08;
          padding-bottom: 0.08em;
          vertical-align: top;
        }
        .codlinx-word-mask:not(:last-child) { margin-right: 0.22em; }
        .codlinx-word-inner {
          display: inline-block;
          transform: translate3d(0, 110%, 0);
          animation: codlinx-word-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform;
        }

        /* Line 2 — gradient text rendered as ONE element so background-clip works.
           The reveal is done via a sliding mask, NOT a per-word transform. */
        .codlinx-hero-line2 { padding-bottom: 0.12em; }
        .codlinx-gradient-text {
          display: inline-block;
          background-image: linear-gradient(120deg, #3FC9B4 0%, #7FF0DC 45%, #ffffff 100%);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          line-height: 1.1;
          padding-right: 0.06em;
          -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 100%);
          mask-image: linear-gradient(90deg, #000 0%, #000 100%);
          -webkit-mask-size: 200% 100%;
          mask-size: 200% 100%;
          -webkit-mask-position: 100% 0;
          mask-position: 100% 0;
          transition:
            -webkit-mask-position 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.55s,
            mask-position 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.55s,
            background-position 8s ease-in-out infinite alternate;
          animation: codlinx-gradient-pan 9s ease-in-out infinite alternate;
        }
        .codlinx-gradient-text.is-shown {
          -webkit-mask-position: 0% 0;
          mask-position: 0% 0;
        }

        @keyframes codlinx-metric-in {
          from { opacity: 0; transform: translateY(18px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .codlinx-metric {
          opacity: 0;
          animation: codlinx-metric-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
        @keyframes codlinx-metric-shine {
          0% { transform: translateX(-120%) skewX(-20deg); }
          60%, 100% { transform: translateX(220%) skewX(-20deg); }
        }
        @keyframes codlinx-logo-drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .codlinx-word-inner,
          .codlinx-metric {
            transform: none !important;
            animation: none !important;
            opacity: 1 !important;
          }
          .codlinx-gradient-text {
            -webkit-mask-position: 0% 0 !important;
            mask-position: 0% 0 !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function MetricCard({
  m,
  index,
}: {
  m: { value: string; label: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 8 });
    setSpot({ x: px * 100, y: py * 100 });
  };

  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setSpot({ x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="codlinx-metric relative overflow-hidden bg-black/40 p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:p-8"
      style={{
        animationDelay: `${800 + index * 110}ms`,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s ease-out, background-color 0.3s",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(320px circle at ${spot.x}% ${spot.y}%, rgba(63,201,180,0.18), transparent 60%)`,
          opacity: tilt.x !== 0 || tilt.y !== 0 ? 1 : 0,
        }}
      />
      <Counter
        value={m.value}
        delay={900 + index * 110}
        duration={1500}
        className="block text-3xl font-semibold tracking-tight sm:text-4xl"
        style={{
          background: `linear-gradient(180deg, #ffffff 0%, ${ACCENT} 140%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      />
      <div className="mt-1.5 text-xs uppercase tracking-[0.18em] text-white/55">
        {m.label}
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-2 left-0 w-16"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          animation: `codlinx-metric-shine 6s ease-in-out ${index * 0.4 + 2}s infinite`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
