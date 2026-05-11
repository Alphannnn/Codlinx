"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ACCENT = "#3FC9B4";

const METRICS = [
  { value: "120+", label: "Products shipped" },
  { value: "40+", label: "Engineers & designers" },
  { value: "12", label: "Industries served" },
  { value: "4.9/5", label: "Client rating" },
];

const CLIENT_LOGOS = [
  "Northwind",
  "Lumen",
  "Helios",
  "Atlas",
  "Quanta",
  "Nimbus",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <div
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
        }}
      />

      <div
        aria-hidden
        className="absolute left-1/2 top-[-220px] -z-10 h-[560px] w-[1100px] -translate-x-1/2 rounded-full blur-[120px] opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${ACCENT} 0%, rgba(63,201,180,0.2) 35%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-[-120px] -z-10 h-[520px] w-[520px] rounded-full blur-[110px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(120,80,255,0.6) 0%, transparent 70%)",
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

          <h1
            className={`mt-7 max-w-5xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-[88px] transition-all duration-700 delay-100 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            Software that moves
            <br />
            <span className="relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${ACCENT} 0%, #7FF0DC 45%, #ffffff 100%)`,
                }}
              >
                businesses forward.
              </span>
              <svg
                aria-hidden
                viewBox="0 0 600 24"
                className="absolute -bottom-2 left-0 h-3 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 18 Q150 4 300 14 T598 12"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.6"
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
            <Link
              href="/contact"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Start a Project</span>
              <svg
                viewBox="0 0 16 16"
                className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
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
            {CLIENT_LOGOS.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold tracking-wider text-white/40 grayscale transition-all duration-300 hover:text-white/80 hover:grayscale-0"
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
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="relative bg-black/40 p-6 transition-colors duration-300 hover:bg-white/[0.02] sm:p-8"
            >
              <div
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
                style={{
                  background: `linear-gradient(180deg, #ffffff 0%, ${ACCENT} 140%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {m.value}
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-[0.18em] text-white/50">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <style jsx global>{`
        @keyframes codlinx-float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-18px) translateX(8px);
          }
        }
      `}</style>
    </section>
  );
}
