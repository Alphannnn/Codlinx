"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Counter from "./Counter";
import Tilt from "./Tilt";
import Reveal from "./Reveal";
import type { Project } from "../lib/projects";

const ACCENT = "#3FC9B4";

type Variant = "grid" | "list";

export default function WorkFilterGrid({
  projects,
  showLayoutToggle = true,
  showServiceFilter = false,
  initialIndustry = "All",
}: {
  projects: Project[];
  showLayoutToggle?: boolean;
  showServiceFilter?: boolean;
  initialIndustry?: string;
}) {
  const industries = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.industry)))],
    [projects]
  );
  const services = useMemo(
    () =>
      Array.from(new Set(projects.flatMap((p) => p.services))).slice(0, 7),
    [projects]
  );

  const [industry, setIndustry] = useState(initialIndustry);
  const [service, setService] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [variant, setVariant] = useState<Variant>("grid");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (industry !== "All" && p.industry !== industry) return false;
      if (service && !p.services.includes(service)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${p.client} ${p.title} ${p.blurb} ${p.tags.join(" ")} ${p.industry}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [projects, industry, service, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-zinc-900/[0.06] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {industries.map((ind) => {
              const active = ind === industry;
              return (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setIndustry(ind)}
                  className={[
                    "group inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-all duration-300",
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
                      : "border-zinc-900/10 bg-white text-zinc-700 hover:border-zinc-900/30 hover:-translate-y-[1px]",
                  ].join(" ")}
                >
                  {ind}
                  {active && (
                    <span
                      className="ml-1 inline-flex h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: ACCENT,
                        animation: "codlinx-grid-pulse 1.4s ease-in-out infinite",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Search projects…"
                className="h-9 w-56 rounded-full border border-zinc-900/10 bg-white pl-9 pr-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-zinc-900/30 focus:outline-none focus:ring-0"
              />
              <svg
                viewBox="0 0 16 16"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11l3 3" />
              </svg>
            </div>

            {showLayoutToggle && (
              <div className="hidden gap-1 rounded-full border border-zinc-900/10 bg-white p-1 sm:flex">
                {(["grid", "list"] as Variant[]).map((v) => {
                  const active = variant === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVariant(v)}
                      aria-label={`Switch to ${v} view`}
                      className={[
                        "grid h-7 w-8 place-items-center rounded-full transition-colors",
                        active ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900",
                      ].join(" ")}
                    >
                      {v === "grid" ? (
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden>
                          <rect x="1" y="1" width="6" height="6" rx="1" />
                          <rect x="9" y="1" width="6" height="6" rx="1" />
                          <rect x="1" y="9" width="6" height="6" rx="1" />
                          <rect x="9" y="9" width="6" height="6" rx="1" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden>
                          <rect x="1" y="2" width="14" height="2.4" rx="1" />
                          <rect x="1" y="7" width="14" height="2.4" rx="1" />
                          <rect x="1" y="12" width="14" height="2.4" rx="1" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {showServiceFilter && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Service ·
            </span>
            <button
              type="button"
              onClick={() => setService(null)}
              className={[
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                service === null
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900",
              ].join(" ")}
            >
              Any
            </button>
            {services.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(service === s ? null : s)}
                className={[
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  service === s
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:text-zinc-900",
                ].join(" ")}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          <span>
            Showing{" "}
            <span className="font-semibold text-zinc-900">
              {String(filtered.length).padStart(2, "0")}
            </span>{" "}
            of {String(projects.length).padStart(2, "0")} projects
          </span>
          {(industry !== "All" || service || query) && (
            <button
              type="button"
              onClick={() => {
                setIndustry("All");
                setService(null);
                setQuery("");
              }}
              className="text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 grid place-items-center rounded-3xl border border-dashed border-zinc-900/10 bg-[#FAFAF7] py-16 text-center">
          <div className="text-2xl font-semibold tracking-tight text-zinc-900">
            No matches yet.
          </div>
          <p className="mt-2 max-w-sm text-sm text-zinc-500">
            Try a different industry or service — or tell us what you&apos;re looking for.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-zinc-900 px-4 text-sm font-semibold text-white"
          >
            Tell us about your project
            <span
              className="grid h-6 w-6 place-items-center rounded-full"
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
      ) : variant === "grid" ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {filtered.map((p, idx) => (
            <Reveal key={p.slug} delay={(idx % 4) * 80}>
              <Tilt max={4} scale={1.01} glare={false} className="h-full">
                <Link
                  href={`/work/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white shadow-[0_18px_50px_-30px_rgba(0,0,0,0.2)] transition-all duration-500 hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.28)]"
                >
                  <div className="relative h-[260px] overflow-hidden">
                    <Image
                      src={p.heroImage}
                      alt={p.heroAlt}
                      width={1200}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.55) 100%)",
                      }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${p.hue}, transparent 60%)`,
                      }}
                    />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: p.swatch }}
                      />
                      {p.industry}
                    </div>
                    <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
                      {p.year}
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-px left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
                      style={{ backgroundColor: p.swatch }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-7">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                        {p.client}
                      </div>
                      <h3 className="mt-2.5 text-balance text-xl font-semibold leading-[1.25] tracking-tight sm:text-2xl">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-600">
                      {p.blurb}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-zinc-900/[0.06] pt-5">
                      <div>
                        <div
                          className="text-2xl font-semibold tracking-tight sm:text-3xl"
                          style={{ color: p.swatch }}
                        >
                          <Counter value={p.metric.value} />
                        </div>
                        <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                          {p.metric.label}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 transition-colors group-hover:text-zinc-900">
                        Read
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
                      </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {filtered.map((p, idx) => (
            <Reveal key={p.slug} delay={idx * 60}>
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-[120px_1fr_auto] items-center gap-6 rounded-2xl border border-zinc-900/[0.06] bg-white p-3 pr-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/15 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.25)] sm:grid-cols-[160px_1fr_auto]"
              >
                <div className="relative h-20 overflow-hidden rounded-xl sm:h-24">
                  <Image
                    src={p.heroImage}
                    alt={p.heroAlt}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 50%, ${p.hue})`,
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: p.swatch }}
                    />
                    {p.industry} · {p.year}
                  </div>
                  <div className="mt-1 truncate text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
                    {p.client} — {p.title}
                  </div>
                  <p className="mt-1 hidden truncate text-xs text-zinc-500 sm:block">
                    {p.blurb}
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <div
                      className="text-base font-semibold tracking-tight sm:text-lg"
                      style={{ color: p.swatch }}
                    >
                      {p.metric.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      {p.metric.label}
                    </div>
                  </div>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full bg-zinc-900 text-white transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:scale-110"
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
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
