"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#3FC9B4";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export default function TestimonialCarousel({
  items,
  interval = 6500,
}: {
  items: Testimonial[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [items.length, interval, paused]);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-[0.18] blur-3xl"
        style={{ backgroundColor: ACCENT }}
      />
      <div className="relative">
        <svg
          viewBox="0 0 32 24"
          className="h-10 w-10"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M4 14c0-5 3-9 8-10M20 14c0-5 3-9 8-10" />
          <path d="M4 14h6v6H4zM20 14h6v6h-6z" />
        </svg>

        <div className="relative mt-6 h-[200px] sm:h-[180px]">
          {items.map((t, i) => (
            <figure
              key={t.author}
              aria-hidden={i !== index}
              className="absolute inset-0 transition-all duration-700"
              style={{
                opacity: i === index ? 1 : 0,
                transform:
                  i === index
                    ? "translate3d(0,0,0)"
                    : i < index
                    ? "translate3d(-20px,0,0)"
                    : "translate3d(20px,0,0)",
                pointerEvents: i === index ? "auto" : "none",
              }}
            >
              <blockquote className="text-balance text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-black"
                  style={{ backgroundColor: ACCENT }}
                >
                  {t.author
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span>
                  <span className="block font-semibold text-white">
                    {t.author}
                  </span>
                  <span className="block text-xs text-white/55">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className="group relative h-1.5 overflow-hidden rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 36 : 16,
                  backgroundColor:
                    i === index ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)",
                }}
              >
                {i === index && !paused && (
                  <span
                    key={index}
                    className="absolute left-0 top-0 h-full"
                    style={{
                      backgroundColor: ACCENT,
                      width: "100%",
                      animation: `codlinx-progress ${interval}ms linear forwards`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                setIndex((i) => (i - 1 + items.length) % items.length)
              }
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 transition-colors hover:border-white/35 hover:text-white"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3 rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 transition-colors hover:border-white/35 hover:text-white"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
