"use client";

import Link from "next/link";
import { useState } from "react";

const ACCENT = "#3FC9B4";

export type IndustryItem = {
  slug: string;
  name: string;
  blurb: string;
  highlights: string[];
  caseStudySlug?: string;
  caseStudyLabel?: string;
  swatch?: string;
};

export default function IndustryShowcase({
  items,
}: {
  items: IndustryItem[];
}) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
      <ul className="flex flex-col gap-1.5">
        {items.map((ind, i) => {
          const isActive = i === active;
          return (
            <li key={ind.slug}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={[
                  "group relative w-full overflow-hidden rounded-xl px-4 py-3 text-left transition-all duration-300",
                  isActive
                    ? "bg-zinc-900 text-white shadow-[0_18px_40px_-22px_rgba(0,0,0,0.4)]"
                    : "bg-white text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span
                      className={[
                        "grid h-7 w-7 place-items-center rounded-md text-[10px] font-bold",
                        isActive ? "text-black" : "text-zinc-700",
                      ].join(" ")}
                      style={{
                        backgroundColor: isActive
                          ? ACCENT
                          : "rgba(63,201,180,0.12)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold tracking-tight">
                      {ind.name}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    className={[
                      "h-3.5 w-3.5 transition-transform duration-300",
                      isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-30",
                    ].join(" ")}
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
              </button>
            </li>
          );
        })}
      </ul>

      <div className="relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full opacity-[0.12] blur-3xl transition-colors duration-700"
          style={{ backgroundColor: current.swatch ?? ACCENT }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            <span
              className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
              style={{ backgroundColor: current.swatch ?? ACCENT }}
            />
            Industry · {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>
          <h3
            key={current.slug + "-name"}
            className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl"
            style={{ animation: "codlinx-fadeup 0.5s ease-out" }}
          >
            {current.name}
          </h3>
          <p
            key={current.slug + "-blurb"}
            className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600"
            style={{ animation: "codlinx-fadeup 0.6s ease-out 60ms both" }}
          >
            {current.blurb}
          </p>

          <ul
            key={current.slug + "-list"}
            className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3"
            style={{ animation: "codlinx-fadeup 0.7s ease-out 120ms both" }}
          >
            {current.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 rounded-xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-4 text-sm text-zinc-700"
              >
                <span
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: current.swatch ?? ACCENT }}
                />
                {h}
              </li>
            ))}
          </ul>

          {current.caseStudySlug && (
            <Link
              href={`/work/${current.caseStudySlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              {current.caseStudyLabel ?? `See ${current.name} case study`}
              <span
                className="grid h-6 w-6 place-items-center rounded-full"
                style={{ backgroundColor: current.swatch ?? ACCENT }}
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
          )}
        </div>
      </div>
    </div>
  );
}
