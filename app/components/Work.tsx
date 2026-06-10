"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ACCENT, PROJECTS, type Project } from "../lib/projects";

export default function Work() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft - 24, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const node = c as HTMLElement;
        const childCenter = node.offsetLeft + node.clientWidth / 2;
        const d = Math.abs(childCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const current = PROJECTS[active];

  return (
    <section className="relative isolate overflow-hidden bg-black py-24 text-white sm:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-[120px] transition-[background] duration-700"
        style={{
          background: `radial-gradient(circle, ${current.hue} 0%, transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
              <span
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              Featured Work
            </span>
            <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
              Shipped products.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${ACCENT}, #ffffff)`,
                }}
              >
                Real outcomes.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 text-xs uppercase tracking-[0.2em] text-white/40 md:flex">
              <span
                className="font-semibold text-white"
                style={{ color: ACCENT }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(PROJECTS.length).padStart(2, "0")}</span>
            </div>
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => goTo(Math.max(0, active - 1))}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M11 13L6 8l5-5" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() =>
                goTo(Math.min(PROJECTS.length - 1, active + 1))
              }
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative mt-12 -mx-5 sm:-mx-8">
          <div
            ref={trackRef}
            className="codlinx-track flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 sm:px-8 lg:gap-8"
            style={{ scrollbarWidth: "none" }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                isActive={i === active}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-label={`Go to ${p.client}`}
                onClick={() => goTo(i)}
                className="group relative h-1.5 overflow-hidden rounded-full transition-all duration-500"
                style={{
                  width: i === active ? 48 : 12,
                  backgroundColor:
                    i === active ? "transparent" : "rgba(255,255,255,0.15)",
                }}
              >
                {i === active && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                )}
              </button>
            ))}
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            See all 40+ case studies
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .codlinx-track::-webkit-scrollbar { display: none; }
        @keyframes codlinx-heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.18); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
          60% { transform: scale(1); }
        }
        @keyframes codlinx-candle {
          0% { transform: scaleY(0); opacity: 0; }
          15%, 100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes codlinx-stream-line {
          0% { stroke-dashoffset: 600; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes codlinx-token {
          0% { opacity: 0; transform: translateY(6px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes codlinx-grid-pulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({
  project,
  isActive,
}: {
  project: Project;
  isActive: boolean;
}) {
  return (
    <article
      className={`relative flex w-[88%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-all duration-700 sm:w-[78%] md:w-[68%] lg:w-[62%] xl:w-[58%] ${
        isActive
          ? "scale-100 opacity-100"
          : "scale-[0.96] opacity-60"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-700"
        style={{
          background: project.hue,
          opacity: isActive ? 0.9 : 0.3,
        }}
      />

      <div className="relative h-[300px] overflow-hidden border-b border-white/[0.06] sm:h-[360px]">
        {project.visual}
      </div>

      <div className="relative flex flex-1 flex-col gap-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-white/45">
          <span className="font-semibold text-white/80">
            {project.client}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>{project.industry}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>{project.year}</span>
        </div>

        <h3 className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          {project.blurb}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2">
          <div>
            <div
              className="text-4xl font-semibold tracking-tight sm:text-5xl"
              style={{
                background: `linear-gradient(180deg, #ffffff 0%, ${ACCENT} 140%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {project.metric.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">
              {project.metric.label}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="flex flex-wrap justify-end gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              href={`/work/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white"
            >
              Read case study
              <span
                className="grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ backgroundColor: ACCENT }}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
