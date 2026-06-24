import Link from "next/link";
import type { ReactNode } from "react";

const ACCENT = "#3FC9B4";

type Stat = { value: string; label: string };

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  stats,
  backHref = "/",
  backLabel = "Back to home",
  children,
  media,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  stats?: Stat[];
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
  /** Full-width visual rendered beneath the hero copy (e.g. a project reel). */
  media?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 80% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 80% at 50% 30%, black 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-220px] -z-10 h-[520px] w-[1000px] -translate-x-1/2 rounded-full opacity-25 blur-[140px]"
        style={{
          background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
        <Link
          href={backHref}
          className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-hover:-translate-x-0.5">
            <svg
              viewBox="0 0 16 16"
              className="h-2.5 w-2.5 rotate-180"
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
          {backLabel}
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
          <span
            className="h-1 w-1 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          {eyebrow}
        </span>

        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]">
          {title}
          {highlight && (
            <>
              {" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${ACCENT}, #ffffff)`,
                }}
              >
                {highlight}
              </span>
            </>
          )}
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
          {description}
        </p>

        {stats && stats.length > 0 && (
          <dl
            className={`mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:max-w-2xl ${
              stats.length === 4
                ? "grid-cols-2 sm:grid-cols-4"
                : "grid-cols-3"
            }`}
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-black/40 px-5 py-4">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {s.label}
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {children}
      </div>

      {media && <div className="pb-16 sm:pb-20">{media}</div>}
    </section>
  );
}
