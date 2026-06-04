"use client";

import { useEffect, useState } from "react";

export type ActivityItem = {
  id: string;
  kind: "meeting" | "blog" | "signup" | "career";
  title: string;
  subtitle: string;
  at: string; // ISO
  hue: string;
};

const RELATIVE_THRESHOLDS: [number, string][] = [
  [60, "just now"],
  [3600, "m"],
  [86400, "h"],
  [86400 * 7, "d"],
];

function relative(iso: string, now: number): string {
  const diff = Math.max(0, (now - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

const ICONS: Record<ActivityItem["kind"], React.ReactNode> = {
  meeting: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3.5" width="12" height="11" rx="1.5" />
      <path d="M2 7h12M5 2v3M11 2v3" />
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 2.5h7a2 2 0 0 1 2 2V14H5a2 2 0 0 1-2-2V2.5zM12 14V4.5" />
    </svg>
  ),
  signup: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="6" r="2.5" />
      <path d="M3 13.5c.6-2.2 2.5-3.5 5-3.5s4.4 1.3 5 3.5" />
      <path d="M12 3.5h2M13 2.5v2" />
    </svg>
  ),
  career: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="6" r="2" />
      <circle cx="11.5" cy="6" r="2" />
      <path d="M2.5 13c.5-1.6 1.9-2.5 3.5-2.5s3 .9 3.5 2.5M11 10.5c1.5 0 2.5.9 3 2.5" />
    </svg>
  ),
};

export default function ActivityFeed({ items }: { items: ActivityItem[] }) {
  const [now, setNow] = useState<number>(0);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-5 py-10 text-center">
        <p className="text-sm text-white/55">Nothing's happened yet — that&apos;ll change.</p>
      </div>
    );
  }

  return (
    <ol className="relative">
      <span
        aria-hidden
        className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-transparent"
      />
      {items.map((item, i) => (
        <li
          key={item.id}
          className="relative flex items-start gap-3 pb-5 pl-0 last:pb-0"
          style={{ animation: `admin-fade-up 0.5s ${i * 70}ms ease-out both` }}
        >
          <span
            className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-[#0a0a0e]"
            style={{ color: item.hue }}
          >
            {ICONS[item.kind]}
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-lg opacity-30"
              style={{ background: `radial-gradient(circle, ${item.hue} 0%, transparent 70%)` }}
            />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="truncate text-sm font-medium text-white">{item.title}</div>
            <div className="truncate text-xs text-white/55">{item.subtitle}</div>
          </div>
          <div
            className="shrink-0 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 tabular-nums"
            title={new Date(item.at).toISOString()}
          >
            {now ? relative(item.at, now) : ""}
          </div>
        </li>
      ))}
    </ol>
  );
}
