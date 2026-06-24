import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../../components/PageHero";
import ClosingCTA from "../../components/ClosingCTA";
import Reveal from "../../components/Reveal";
import Marquee from "../../components/Marquee";
import CursorGlow from "../../components/CursorGlow";
import WhyChooseIcon from "../../components/WhyChooseIcon";
import SocialMediaPage from "../_components/SocialMediaPage";
import {
  PORTFOLIO_PAGES,
  PROJECT_GALLERY,
  getPortfolioPage,
  getPortfolioThumb,
  getFeatureRows,
  RECOGNIZED,
  WHY_CHOOSE,
} from "../lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return PORTFOLIO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPortfolioPage(slug);
  if (!page) return { title: "Portfolio" };
  return {
    title: `${page.navLabel} — Portfolio`,
    description: page.description,
    alternates: { canonical: `/portfolio/${page.slug}` },
  };
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function QuoteButton({
  swatch,
  label = "Get a free quote",
}: {
  swatch: string;
  label?: string;
}) {
  return (
    <Link
      href="/contact"
      className="group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
      style={{ backgroundColor: swatch }}
    >
      {label}
      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Dark, recolored stand-in for Digital Otters' section illustrations. */
function VisualPanel({
  swatch,
  hue,
  glyph,
}: {
  swatch: string;
  hue: string;
  glyph: string;
}) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/[0.08]"
      style={{
        background: `radial-gradient(circle at 30% 25%, ${hue}, transparent 60%), linear-gradient(135deg, #0a0a0b 0%, #111114 100%)`,
      }}
    >
      <div
        aria-hidden
        className="codlinx-grid-pan absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="codlinx-float-orb absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: swatch }}
      />

      {/* Sweeping scanline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
      >
        <span
          className="codlinx-scanline absolute inset-x-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${swatch}, transparent)`,
            boxShadow: `0 0 18px 1px ${swatch}`,
          }}
        />
      </div>

      {/* Drifting particles */}
      <span
        aria-hidden
        className="codlinx-drift-1 absolute left-[18%] top-[24%] h-2 w-2 rounded-full"
        style={{ backgroundColor: swatch, boxShadow: `0 0 12px 2px ${swatch}` }}
      />
      <span
        aria-hidden
        className="codlinx-drift-2 absolute bottom-[26%] right-[20%] h-1.5 w-1.5 rounded-full opacity-70"
        style={{ backgroundColor: swatch, boxShadow: `0 0 10px 1px ${swatch}` }}
      />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid place-items-center">
          <span
            aria-hidden
            className="codlinx-pulse-ring absolute h-24 w-24 rounded-3xl border-2"
            style={{ borderColor: swatch }}
          />
          <span
            className="codlinx-bob relative z-10 grid h-24 w-24 place-items-center rounded-3xl text-4xl font-bold text-black shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
            style={{ backgroundColor: swatch }}
          >
            {glyph}
          </span>
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: swatch,
              animation: "codlinx-grid-pulse 1.4s ease-in-out infinite",
            }}
          />
          Codlinx build
        </span>
      </div>
    </div>
  );
}

/** A clickable browser-framed card for a live showcase site (opens new tab). */
function ShowcaseCard({
  name,
  url,
  swatch,
  hue,
  image,
}: {
  name: string;
  url: string;
  swatch: string;
  hue: string;
  image?: string;
}) {
  let domain = url;
  try {
    domain = new URL(url).host.replace(/^www\./, "");
  } catch {
    /* keep raw url */
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name} (${domain}) in a new tab`}
      className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-black/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
        <span className="h-2 w-2 rounded-full bg-green-400/70" />
        <span className="ml-2 truncate text-[10px] font-medium text-white/55">
          {domain}
        </span>
      </div>

      {/* Preview body */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${hue}, transparent 65%), linear-gradient(135deg, #0a0a0b 0%, #111114 100%)`,
        }}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${name} website`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <span
                className="grid h-14 w-14 place-items-center rounded-2xl text-xl font-bold text-black transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: swatch }}
              >
                {name.charAt(0)}
              </span>
            </div>
          </>
        )}
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md transition-all duration-300 group-hover:border-white/35 group-hover:bg-black/90">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: swatch }}
          />
          Open live
          <svg
            viewBox="0 0 16 16"
            className="h-2.5 w-2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 3h7v7M13 3L4 12" />
          </svg>
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 p-4">
        <h3 className="truncate text-sm font-semibold text-white">{name}</h3>
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 shrink-0 text-white/40 transition-colors group-hover:text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 3h7v7M13 3L4 12" />
        </svg>
      </div>
    </a>
  );
}

/* ── Friendly, real-world icons per industry ───────────────────────
   Each portfolio page lists its own industries; we match the name to a
   recognizable icon so the grid feels human, not like abstract tech. */
const INDUSTRY_ICONS: { test: (n: string) => boolean; paths: React.ReactNode }[] =
  [
    {
      test: (n) => n.includes("fashion"),
      paths: (
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      ),
    },
    {
      test: (n) => n.includes("beauty"),
      paths: <path d="M12 3 9.8 8.8 4 11l5.8 2.2L12 19l2.2-5.8L20 11l-5.8-2.2z" />,
    },
    {
      test: (n) => n.includes("home"),
      paths: (
        <>
          <path d="M3 9.5 12 3l9 6.5" />
          <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
          <path d="M9 21v-6h6v6" />
        </>
      ),
    },
    {
      test: (n) => n.includes("electronic"),
      paths: (
        <>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </>
      ),
    },
    {
      test: (n) => n.includes("food") || n.includes("bev"),
      paths: (
        <>
          <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
          <path d="M6 1v3M10 1v3M14 1v3" />
        </>
      ),
    },
    {
      test: (n) => n.includes("dtc"),
      paths: (
        <>
          <path d="M3 7v5a2 2 0 0 0 .59 1.42l7 7a2 2 0 0 0 2.82 0l5.6-5.6a2 2 0 0 0 0-2.82l-7-7A2 2 0 0 0 12 4H5a2 2 0 0 0-2 2Z" />
          <circle cx="7.5" cy="8.5" r="1.5" />
        </>
      ),
    },
    {
      test: (n) => n.includes("commerce"),
      paths: (
        <>
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.4a1.5 1.5 0 0 0 1.5-1.2L22 7H6" />
        </>
      ),
    },
    {
      test: (n) => n.includes("health"),
      paths: (
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" />
      ),
    },
    {
      test: (n) => n.includes("estate"),
      paths: (
        <>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
        </>
      ),
    },
    {
      test: (n) => n.includes("saas"),
      paths: (
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      ),
    },
    {
      test: (n) => n.includes("edtech") || n.includes("education"),
      paths: (
        <>
          <path d="M22 10 12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
        </>
      ),
    },
    {
      test: (n) => n.includes("fintech") || n.includes("finance"),
      paths: (
        <>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </>
      ),
    },
    {
      test: (n) => n.includes("logistic"),
      paths: (
        <>
          <path d="M10 17h4V5H2v12h3" />
          <path d="M14 8h4l4 4v5h-2" />
          <circle cx="7.5" cy="17.5" r="1.5" />
          <circle cx="17.5" cy="17.5" r="1.5" />
        </>
      ),
    },
    {
      test: (n) => n.includes("social"),
      paths: (
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      ),
    },
    {
      test: (n) => n.includes("hospitality"),
      paths: (
        <>
          <path d="M3 19h18" />
          <path d="M5 19a7 7 0 0 1 14 0" />
          <path d="M12 6V4" />
        </>
      ),
    },
    {
      test: (n) => n.includes("corporate"),
      paths: (
        <>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M2 13h20" />
        </>
      ),
    },
    {
      test: (n) => n.includes("local"),
      paths: (
        <path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 0 5.6-5.6l-2.7 2.7-2.1-.6-.6-2.1z" />
      ),
    },
    {
      test: (n) => n.includes("tech"),
      paths: (
        <>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" />
        </>
      ),
    },
  ];

const FALLBACK_INDUSTRY_ICON = (
  <path d="M12 3l2.3 6.2L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3z" />
);

function IndustryGlyph({ name }: { name: string }) {
  const n = name.toLowerCase();
  const match = INDUSTRY_ICONS.find((i) => i.test(n));
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-rotate-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {match ? match.paths : FALLBACK_INDUSTRY_ICON}
    </svg>
  );
}

/** Slow, elegant horizontal reel of real project screenshots for the hero. */
function HeroProjectReel({
  projects,
}: {
  projects: { name: string; url: string; image?: string }[];
}) {
  if (!projects.length) return null;
  return (
    <div className="relative">
      <div className="mx-auto mb-6 flex max-w-6xl items-center gap-3 px-5 sm:px-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
          Selected live projects
        </span>
        <span className="h-px flex-1 bg-white/[0.08]" />
      </div>
      <Marquee gapClass="gap-4 sm:gap-5" className="codlinx-marquee-slow py-1">
        {projects.map((proj) => {
          let domain = proj.url;
          try {
            domain = new URL(proj.url).host.replace(/^www\./, "");
          } catch {
            /* keep raw */
          }
          return (
            <a
              key={proj.url}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${proj.name} live in a new tab`}
              className="group/card relative block w-[280px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 sm:w-[330px]"
            >
              <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-black/60 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
                <span className="ml-2 truncate text-[10px] font-medium text-white/55">
                  {domain}
                </span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                {proj.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={proj.image}
                    alt={`${proj.name} website`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-out group-hover/card:scale-[1.06]"
                  />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                />
                <span className="absolute bottom-2.5 left-3 translate-y-1 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                  {proj.name}
                </span>
              </div>
            </a>
          );
        })}
      </Marquee>
    </div>
  );
}

export default async function PortfolioServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPortfolioPage(slug);
  if (!page) notFound();

  // This slug gets a bespoke, motion-rich recreation that mirrors the
  // Digital Otters social-media page section for section.
  if (page.slug === "social-media-management") {
    return <SocialMediaPage page={page} />;
  }

  const swatch = page.swatch;
  const featureRows = getFeatureRows(page.slug);
  const others = PORTFOLIO_PAGES.filter((p) => p.slug !== page.slug).slice(0, 4);

  return (
    <>
      <CursorGlow />

      {/* Hero */}
      <PageHero
        eyebrow={`Portfolio · ${page.eyebrow}`}
        title={page.title}
        highlight={page.highlight}
        description={page.description}
        backHref="/portfolio"
        backLabel="All portfolio pages"
        stats={page.heroStats}
        media={<HeroProjectReel projects={PROJECT_GALLERY} />}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <QuoteButton swatch={swatch} />
          <a
            href={page.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-medium text-white/55 transition-colors hover:text-white"
          >
            <span className="relative inline-flex h-2 w-2">
              <span
                className="codlinx-pulse-ring absolute inset-0 rounded-full"
                style={{ backgroundColor: swatch }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: swatch }}
              />
            </span>
            Concept reimagined from digitalotters.com
            <svg
              viewBox="0 0 16 16"
              className="h-2.5 w-2.5 opacity-60 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 3h7v7M13 3L4 12" />
            </svg>
          </a>
        </div>
      </PageHero>

      {/* Recognized-by strip */}
      <section className="border-y border-white/[0.06] bg-[#08080a] py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Recognized by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
            {RECOGNIZED.map((r) => (
              <span
                key={r}
                className="text-sm font-semibold tracking-tight text-white/35 transition-colors hover:text-white/70 sm:text-base"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview — "What is X" 2-column */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                {page.overview.kicker}
              </span>
              <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-[34px]">
                {page.overview.heading}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
                {page.overview.body}
              </p>
              <div className="mt-8">
                <QuoteButton swatch={swatch} />
              </div>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <VisualPanel
                swatch={swatch}
                hue={page.hue}
                glyph={page.navLabel.charAt(0)}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Offerings — card grid */}
      <section className="relative isolate overflow-hidden bg-[#08080a] py-20 sm:py-28">
        <div
          aria-hidden
          className="codlinx-float-orb absolute left-[8%] top-1/4 -z-10 h-[360px] w-[360px] rounded-full opacity-[0.14] blur-[140px]"
          style={{ backgroundColor: swatch }}
        />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: swatch }}
                />
                What we offer
              </span>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Everything inside {page.navLabel}.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.offerings.map((o, idx) => (
              <Reveal key={o.title} delay={(idx % 3) * 90}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-12 -top-12 h-32 -skew-x-12 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${page.hue}, transparent)`,
                    }}
                  />
                  <div className="relative">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-base font-bold text-black transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-110"
                      style={{ backgroundColor: swatch }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                      {o.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {o.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Live showcase — real example sites, each opens in a new tab */}
      {page.showcase && (
        <section className="bg-black py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: swatch }}
                  />
                  {page.showcase.kicker}
                </span>
                <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  {page.showcase.heading}
                </h2>
                {page.showcase.sub && (
                  <p className="mt-4 text-pretty text-base leading-relaxed text-white/60">
                    {page.showcase.sub}
                  </p>
                )}
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.showcase.sites.map((site, idx) => (
                <Reveal key={site.url} delay={(idx % 3) * 80}>
                  <ShowcaseCard
                    name={site.name}
                    url={site.url}
                    swatch={swatch}
                    hue={page.hue}
                    image={site.image}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alternating feature rows */}
      {featureRows.length > 0 && (
        <section className="bg-black py-20 sm:py-28">
          <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 sm:gap-24 sm:px-8">
            {featureRows.map((row, idx) => {
              const flip = idx % 2 === 1;
              return (
                <div
                  key={row.title}
                  className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <Reveal
                    direction={flip ? "right" : "left"}
                    className={flip ? "lg:order-2" : ""}
                  >
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: swatch }}
                    >
                      0{idx + 1}
                    </span>
                    <h3 className="mt-3 max-w-md text-balance text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
                      {row.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65">
                      {row.body}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {row.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-sm text-white/75"
                        >
                          <span
                            className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-black"
                            style={{ backgroundColor: swatch }}
                          >
                            <svg
                              viewBox="0 0 16 16"
                              className="h-3 w-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M3 8.5l3 3 7-7" />
                            </svg>
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal
                    direction={flip ? "left" : "right"}
                    delay={100}
                    className={flip ? "lg:order-1" : ""}
                  >
                    <VisualPanel
                      swatch={swatch}
                      hue={page.hue}
                      glyph={String(idx + 1)}
                    />
                  </Reveal>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Results / stats band */}
      {page.metricBand && (
        <section className="bg-[#08080a] py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] lg:grid-cols-4">
              {page.metricBand.map((m) => (
                <div key={m.label} className="bg-black/40 px-6 py-7">
                  <dd
                    className="text-2xl font-semibold tracking-tight sm:text-3xl"
                    style={{ color: swatch }}
                  >
                    {m.value}
                  </dd>
                  <dt className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Process */}
      {page.process && (
        <section className="bg-black py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                {page.process.kicker}
              </span>
              <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                {page.process.heading}
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {page.process.steps.map((s, idx) => (
                <Reveal key={s.title} delay={(idx % 2) * 80}>
                  <div className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-semibold"
                      style={{ borderColor: `${swatch}66`, color: swatch }}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages */}
      {page.packages && (
        <section className="bg-[#08080a] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: swatch }}
                  />
                  Our packages
                </span>
                <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Plans that scale with you.
                </h2>
              </div>
            </Reveal>

            <div
              className={`mt-14 grid grid-cols-1 gap-5 ${
                page.packages.length >= 4
                  ? "md:grid-cols-2 lg:grid-cols-4"
                  : "md:grid-cols-3"
              }`}
            >
              {page.packages.map((pkg, idx) => (
                <Reveal key={pkg.name} delay={(idx % 4) * 70}>
                  <div
                    className={[
                      "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
                      pkg.featured
                        ? "border-white/25 bg-white/[0.05]"
                        : "border-white/[0.07] bg-white/[0.02] hover:border-white/20",
                    ].join(" ")}
                  >
                    {pkg.featured && (
                      <span
                        className="absolute right-4 top-4 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-black"
                        style={{ backgroundColor: swatch }}
                      >
                        Popular
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-white">
                      {pkg.name}
                    </h3>
                    {pkg.price && (
                      <div
                        className="mt-2 text-2xl font-semibold tracking-tight"
                        style={{ color: swatch }}
                      >
                        {pkg.price}
                      </div>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {pkg.blurb}
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-white/[0.06] pt-5">
                      {pkg.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm text-white/75"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: swatch }}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M3 8.5l3 3 7-7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold text-white transition-colors hover:border-white/35"
                    >
                      Get a free quote
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industries grid */}
      {page.industries && (
        <section className="bg-black py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  Industries we cater
                </span>
                <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Tuned to the sector you operate in.
                </h2>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {page.industries.map((ind, idx) => (
                <Reveal key={ind} delay={(idx % 6) * 50}>
                  <div className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.04]">
                    <span className="relative grid place-items-center">
                      <span
                        aria-hidden
                        className="absolute h-11 w-11 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50"
                        style={{ backgroundColor: swatch }}
                      />
                      <span
                        className="codlinx-bob relative grid h-11 w-11 place-items-center rounded-xl text-black shadow-[0_10px_24px_-12px_rgba(0,0,0,0.7)]"
                        style={{
                          backgroundColor: swatch,
                          animationDelay: `${(idx % 6) * 0.45}s`,
                        }}
                      >
                        <IndustryGlyph name={ind} />
                      </span>
                    </span>
                    <span className="text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                      {ind}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose */}
      <section className="bg-[#08080a] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: swatch }}
                />
                Why choose us
              </span>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Why brands choose this team.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.map((w, idx) => (
              <Reveal key={w.title} delay={(idx % 3) * 80}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-12 -top-12 h-32 -skew-x-12 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${page.hue}, transparent)`,
                    }}
                  />
                  <div className="relative">
                    <span className="relative grid h-12 w-12 place-items-center">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60"
                        style={{ backgroundColor: swatch }}
                      />
                      <span
                        className="relative grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5"
                        style={{
                          backgroundColor: `${swatch}1f`,
                          color: swatch,
                          boxShadow: `inset 0 0 0 1px ${swatch}59`,
                        }}
                      >
                        <WhyChooseIcon
                          name={w.icon}
                          className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                        />
                      </span>
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-white">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {w.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools / platforms marquee */}
      {page.marquee && page.marquee.length > 0 && (
        <section className="border-y border-white/[0.06] bg-black py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            {page.marqueeTitle && (
              <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                {page.marqueeTitle}
              </p>
            )}
            <Marquee gapClass="gap-3 sm:gap-4">
              {page.marquee.map((item) => (
                <span
                  key={item}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: swatch }}
                  />
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
        </section>
      )}

      {/* FAQ accordion */}
      {page.faqs && (
        <section className="bg-[#08080a] py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal>
              <h2 className="text-balance text-center text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Frequently asked.
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-col gap-3">
              {page.faqs.map((f, idx) => (
                <Reveal key={f.q} delay={(idx % 3) * 60}>
                  <details className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/15 [&_summary]:list-none">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-white">
                      {f.q}
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition-transform duration-300 group-open:rotate-45"
                        aria-hidden
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        >
                          <path d="M8 3v10M3 8h10" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More from this portfolio piece */}
      <section className="bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                More from this portfolio piece
              </h2>
              <Link
                href="/portfolio"
                className="hidden shrink-0 items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white sm:inline-flex"
              >
                View all
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, idx) => {
              const thumb = getPortfolioThumb(o.slug);
              return (
                <Reveal key={o.slug} delay={(idx % 4) * 60}>
                  <Link
                    href={`/portfolio/${o.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb}
                          alt={`${o.navLabel} preview`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `radial-gradient(circle at 30% 20%, ${o.hue}, transparent 65%), #0a0a0b`,
                          }}
                        />
                      )}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                      />
                      <span
                        className="absolute left-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold text-black shadow-lg"
                        style={{ backgroundColor: o.swatch }}
                      >
                        {o.navLabel.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-sm font-semibold text-white">
                        {o.navLabel}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50">
                        {o.navDescription}
                      </p>
                      <span
                        className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: o.swatch }}
                      >
                        View page
                        <ArrowIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ClosingCTA
        tone="dark"
        eyebrow="Like what you see?"
        title="We can build this for your brand."
        body="This page is a Codlinx concept rebuild. Tell us what you're marketing and we'll come back with a plan, a team, and a price within 24 hours."
        primary={{ label: "Get a free quote", href: "/contact" }}
        secondary={{ label: "Back to portfolio", href: "/portfolio" }}
      />
    </>
  );
}
