"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "./Reveal";

const ACCENT = "#3FC9B4";

export type ClientRow = {
  name: string;
  sector: string;
  since: string;
  featured?: boolean;
  slug?: string;
};

export default function ClientGrid({ clients }: { clients: ClientRow[] }) {
  const sectors = useMemo(
    () => ["All", ...Array.from(new Set(clients.map((c) => c.sector)))],
    [clients]
  );
  const [sector, setSector] = useState("All");
  const [showFeatured, setShowFeatured] = useState(false);

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (sector !== "All" && c.sector !== sector) return false;
      if (showFeatured && !c.featured) return false;
      return true;
    });
  }, [clients, sector, showFeatured]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900/[0.06] pb-5">
        <div className="flex flex-wrap items-center gap-2">
          {sectors.map((s) => {
            const active = s === sector;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSector(s)}
                className={[
                  "inline-flex h-8 items-center rounded-full border px-3 text-xs font-medium transition-all duration-200",
                  active
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-900/10 bg-white text-zinc-700 hover:border-zinc-900/30",
                ].join(" ")}
              >
                {s}
              </button>
            );
          })}
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-zinc-600">
          <span
            className={[
              "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
              showFeatured ? "bg-zinc-900" : "bg-zinc-200",
            ].join(" ")}
          >
            <input
              type="checkbox"
              checked={showFeatured}
              onChange={(e) => setShowFeatured(e.target.checked)}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <span
              className={[
                "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                showFeatured ? "translate-x-5" : "translate-x-1",
              ].join(" ")}
            />
          </span>
          Case study only
        </label>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
        <span>
          <span className="font-semibold text-zinc-900">{filtered.length}</span> of {clients.length} clients
        </span>
        <span className="hidden text-zinc-400 sm:inline">
          {sector === "All" ? "All sectors" : sector}
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-zinc-200 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((c, i) => {
          const inner = (
            <div className="group relative flex h-full flex-col justify-between gap-5 overflow-hidden bg-white p-6 transition-colors hover:bg-[#FAFAF7]">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-px left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: ACCENT }}
              />
              <div className="flex items-start justify-between gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-lg text-sm font-bold text-black transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                  style={{ backgroundColor: ACCENT }}
                >
                  {c.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                {c.featured && (
                  <span className="rounded-full border border-zinc-900/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-colors group-hover:border-zinc-900 group-hover:text-zinc-900">
                    Case study
                  </span>
                )}
              </div>
              <div>
                <div className="text-base font-semibold tracking-tight">
                  {c.name}
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  {c.sector} · since {c.since}
                </div>
              </div>
              {c.featured && c.slug && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3 w-3"
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
              )}
            </div>
          );
          return (
            <Reveal key={c.name} delay={(i % 8) * 40}>
              <li>
                {c.featured && c.slug ? (
                  <Link href={`/work/${c.slug}`} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            </Reveal>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-900/10 bg-white py-12 text-center">
          <p className="text-sm text-zinc-500">
            No clients match this filter yet.
          </p>
          <button
            type="button"
            onClick={() => {
              setSector("All");
              setShowFeatured(false);
            }}
            className="mt-3 text-sm font-semibold text-zinc-900 underline underline-offset-4"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
