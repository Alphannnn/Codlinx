import type { ReactNode } from "react";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import ClosingCTA from "../../components/ClosingCTA";
import Reveal from "../../components/Reveal";
import Marquee from "../../components/Marquee";
import Counter from "../../components/Counter";
import Tilt from "../../components/Tilt";
import CursorGlow from "../../components/CursorGlow";
import SocialAdGallery from "./SocialAdGallery";
import type { PortfolioPage } from "../lib/content";

const SWATCH = "#3FC9B4";
const HUE = "rgba(63,201,180,0.22)";

/* ───────────────────────────── Platform icons ───────────────────────────── */

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M18.9 2H22l-7.3 8.3L23 22h-6.6l-5.2-6.8L5.2 22H2l7.8-8.9L1.5 2h6.8l4.7 6.2L18.9 2Zm-2.3 18h1.7L7.1 3.8H5.3L16.6 20Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M16.5 2c.27 1.9 1.32 3.5 2.95 4.32a6.1 6.1 0 0 0 2.55.68v3.2a9.3 9.3 0 0 1-5-1.5v6.6a6.3 6.3 0 1 1-6.3-6.3c.34 0 .67.03 1 .08v3.3a3 3 0 1 0 2.1 2.86V2h2.7Z" />
    </svg>
  );
}

type Platform = {
  name: string;
  icon: ReactNode;
  body: string;
};

const PLATFORMS: Platform[] = [
  { name: "Facebook", icon: <FacebookIcon />, body: "Granular audience targeting to put your offer in front of the exact customer most likely to buy." },
  { name: "Instagram", icon: <InstagramIcon />, body: "Memorable reels and visually-led campaigns that earn saves, shares, and new follows." },
  { name: "Twitter / X", icon: <XIcon />, body: "A text-first platform ideal for B2B reach, real-time relevance, and thought leadership." },
  { name: "LinkedIn", icon: <LinkedInIcon />, body: "Business networking turned into a repeatable, measurable lead-generation engine." },
  { name: "YouTube", icon: <YouTubeIcon />, body: "Long- and short-form video that compounds brand awareness and pipeline over time." },
  { name: "TikTok", icon: <TikTokIcon />, body: "The fastest-growing platform — built for quick reach and sharp, trackable sales lifts." },
];

const RECOGNIZED = [
  "Google Partner",
  "Meta Business Partner",
  "Trustpilot",
  "GoodFirms",
  "SiteJabber",
  "Clutch",
  "Semrush Certified",
];

type Pkg = {
  name: string;
  blurb: string;
  groups: { label: string; items: string[] }[];
  featured?: boolean;
};

const PACKAGES: Pkg[] = [
  {
    name: "Social Basic",
    blurb: "For brands establishing a consistent presence.",
    groups: [
      { label: "Standard offerings", items: ["8 posts / month", "2 networks managed", "1 brand analysis"] },
      { label: "Marketing", items: ["6 ad campaigns", "Basic community management", "Monthly performance report"] },
    ],
  },
  {
    name: "Social Pro",
    featured: true,
    blurb: "For brands ready to grow across channels.",
    groups: [
      { label: "Standard offerings", items: ["16–20 posts / month", "3 networks managed", "Competitor analysis"] },
      { label: "Marketing", items: ["8 ad campaigns", "Daily community management", "Bi-weekly reporting"] },
    ],
  },
  {
    name: "Social Elite",
    blurb: "For brands running a full-funnel social engine.",
    groups: [
      { label: "Standard offerings", items: ["26–30 posts / month", "Up to 5 networks", "Full content strategy"] },
      { label: "Marketing", items: ["10 ad campaigns", "Priority creative + dedicated manager", "Weekly reporting"] },
    ],
  },
];

const INDUSTRIES: { name: string; body: string }[] = [
  { name: "Ecommerce Brands", body: "Product launches, UGC, and shoppable social." },
  { name: "Healthcare Providers", body: "Trust-building content within compliance." },
  { name: "Real Estate", body: "Listings, neighbourhoods, and agent brand." },
  { name: "Tech Companies", body: "Product storytelling and demand generation." },
  { name: "Educational Institutes", body: "Enrolment campaigns and community." },
  { name: "Corporate Companies", body: "Employer brand and executive presence." },
];

const RESULTS: { value: string; label: string }[] = [
  { value: "+180%", label: "Traffic" },
  { value: "+240%", label: "Engagement" },
  { value: "+320%", label: "Followers" },
  { value: "+150%", label: "Brand awareness" },
  { value: "+90%", label: "Conversions" },
  { value: "+400%", label: "Reach" },
];

const ORGANIC = [
  "Builds long-term brand and community",
  "Compounding reach with no media spend",
  "Trust, voice, and authority over time",
  "The foundation paid ads amplify",
];
const PAID = [
  "Immediate, controllable reach",
  "Precise targeting and retargeting",
  "Scales winners fast once they prove out",
  "Measured against ROAS, not vanity metrics",
];

type Mark = "yes" | "no" | "partial";
const COMPARISON: { feature: string; otters: Mark; inhouse: Mark; agency: Mark }[] = [
  { feature: "Senior specialists on your account", otters: "yes", inhouse: "partial", agency: "no" },
  { feature: "All major networks managed", otters: "yes", inhouse: "partial", agency: "partial" },
  { feature: "On-brand creative included", otters: "yes", inhouse: "no", agency: "partial" },
  { feature: "Daily community management", otters: "yes", inhouse: "no", agency: "partial" },
  { feature: "Organic + paid run together", otters: "yes", inhouse: "no", agency: "partial" },
  { feature: "Transparent monthly reporting", otters: "yes", inhouse: "partial", agency: "no" },
];

function MarkCell({ mark }: { mark: Mark }) {
  if (mark === "yes")
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full text-black" style={{ backgroundColor: SWATCH }}>
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 8.5l3 3 7-7" />
        </svg>
      </span>
    );
  if (mark === "no")
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-white/30" aria-hidden>
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </span>
    );
  return <span className="text-lg text-white/30" aria-hidden>—</span>;
}

function QuoteButton({ label = "Get a free quote" }: { label?: string }) {
  return (
    <Link
      href="/contact"
      className="group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
      style={{ backgroundColor: SWATCH }}
    >
      {label}
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </Link>
  );
}

// Ring coordinates (% within a square box) for the social constellation.
const RING = [
  { x: 50, y: 10 },
  { x: 84, y: 30 },
  { x: 84, y: 70 },
  { x: 50, y: 90 },
  { x: 16, y: 70 },
  { x: 16, y: 30 },
];

function SpreadAcrossSocial() {
  return (
    <section className="relative isolate overflow-hidden bg-black py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 60% 70% at 70% 50%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 70% 50%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="codlinx-float-orb absolute right-[14%] top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-[0.14] blur-[150px]"
        style={{ backgroundColor: SWATCH }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SWATCH }} />
              Everywhere your audience is
            </span>
            <h2 className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
              One brand, spread across every feed.
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/65">
              Your audience doesn&apos;t live on one platform — so neither do you. We run a single, consistent strategy across every major network, so wherever someone scrolls, your brand is already there.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {PLATFORMS.map((p) => (
                <span
                  key={p.name}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-white/80"
                >
                  <span className="text-white/70" style={{ color: SWATCH }}>
                    {p.icon}
                  </span>
                  {p.name}
                </span>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-3 text-sm text-white/55">
              <span className="text-lg font-semibold text-white">7 networks</span>
              <span className="h-4 w-px bg-white/15" />
              <span>one strategy, one voice</span>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {/* connector lines */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
                {RING.map((p, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    stroke={SWATCH}
                    strokeWidth="0.4"
                    strokeOpacity="0.5"
                    strokeDasharray="1.5 3"
                    style={{ animation: `codlinx-stream-line ${6 + i}s linear infinite` }}
                  />
                ))}
              </svg>

              {/* center hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="codlinx-pulse-ring absolute inset-0 rounded-2xl" style={{ backgroundColor: SWATCH }} />
                <span
                  className="relative grid h-16 w-16 place-items-center rounded-2xl text-black shadow-[0_20px_50px_-15px_rgba(63,201,180,0.6)]"
                  style={{ backgroundColor: SWATCH }}
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="18" cy="5" r="2.6" />
                    <circle cx="6" cy="12" r="2.6" />
                    <circle cx="18" cy="19" r="2.6" />
                    <path d="M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3" />
                  </svg>
                </span>
              </div>

              {/* platform nodes */}
              {PLATFORMS.map((p, i) => (
                <span
                  key={p.name}
                  className="codlinx-float-soft absolute grid h-14 w-14 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] text-white shadow-[0_14px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur"
                  style={{
                    left: `${RING[i].x}%`,
                    top: `${RING[i].y}%`,
                    animation: `codlinx-float-soft ${5 + (i % 3)}s ease-in-out ${i * -0.7}s infinite`,
                  }}
                  title={p.name}
                >
                  {p.icon}
                  <span className="absolute -bottom-1.5 right-0 grid h-4 w-4 place-items-center rounded-full bg-black">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: SWATCH, animation: "codlinx-grid-pulse 1.4s ease-in-out infinite" }}
                    />
                  </span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function SocialMediaPage({ page }: { page: PortfolioPage }) {
  return (
    <>
      <CursorGlow />

      {/* Hero with floating platform icons */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="codlinx-float-orb absolute left-[8%] top-[22%] grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/60 backdrop-blur">
            <InstagramIcon />
          </span>
          <span className="codlinx-float-orb absolute right-[10%] top-[18%] grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/60 backdrop-blur" style={{ animationDelay: "-6s" }}>
            <TikTokIcon />
          </span>
          <span className="codlinx-float-orb absolute left-[14%] bottom-[18%] grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/60 backdrop-blur" style={{ animationDelay: "-3s" }}>
            <LinkedInIcon />
          </span>
          <span className="codlinx-float-orb absolute right-[14%] bottom-[22%] grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/60 backdrop-blur" style={{ animationDelay: "-9s" }}>
            <YouTubeIcon />
          </span>
        </div>

        <PageHero
          eyebrow="Portfolio · Social Media Management"
          title="Social Media"
          highlight="Management Agency"
          description="Result-proven Facebook, Instagram, LinkedIn, Twitter, Snapchat, TikTok, and YouTube management and marketing — content that resonates instead of flooding feeds with noise."
          backHref="/portfolio"
          backLabel="All portfolio pages"
          stats={page.heroStats}
        >
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuoteButton />
            <a
              href={page.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs font-medium text-white/55 transition-colors hover:text-white"
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="codlinx-pulse-ring absolute inset-0 rounded-full" style={{ backgroundColor: SWATCH }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: SWATCH }} />
              </span>
              Concept reimagined from digitalotters.com
              <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 opacity-60 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 3h7v7M13 3L4 12" />
              </svg>
            </a>
          </div>
        </PageHero>
      </div>

      {/* Recognized by — moving strip */}
      <section className="border-y border-white/[0.06] bg-[#08080a] py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Recognized by
          </p>
          <Marquee gapClass="gap-10 sm:gap-16">
            {RECOGNIZED.map((r) => (
              <span key={r} className="shrink-0 text-base font-semibold tracking-tight text-white/35 sm:text-lg">
                {r}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* What is social media management */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                What is social media management
              </span>
              <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-[34px]">
                Presence is the easy part. Resonance is the work.
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
                More than half of consumers follow the brands they buy from to keep up with new products and updates. We don&apos;t just fill the feed with promotion — we build a calendar, a voice, and a creative system per channel, then manage the community that gathers around it.
              </p>
              <div className="mt-8"><QuoteButton /></div>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <div
                className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-8"
                style={{ background: `radial-gradient(circle at 30% 20%, ${HUE}, transparent 60%), linear-gradient(135deg,#0a0a0b,#111114)` }}
              >
                <div className="text-center">
                  <div className="text-6xl font-semibold tracking-tight text-white sm:text-7xl">
                    <Counter value="57" />%
                  </div>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                    of consumers follow a brand&apos;s social pages to keep up with new products and updates.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-center gap-3 text-white/60">
                  {[<FacebookIcon key="f" />, <InstagramIcon key="i" />, <XIcon key="x" />, <LinkedInIcon key="l" />, <YouTubeIcon key="y" />, <TikTokIcon key="t" />].map((ic, i) => (
                    <span key={i} className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                      {ic}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Spread across social — icon constellation */}
      <SpreadAcrossSocial />

      {/* Platforms grid */}
      <section className="relative isolate overflow-hidden bg-[#08080a] py-20 sm:py-28">
        <div aria-hidden className="codlinx-float-orb absolute left-[8%] top-1/4 -z-10 h-[360px] w-[360px] rounded-full opacity-[0.14] blur-[140px]" style={{ backgroundColor: SWATCH }} />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SWATCH }} />
                Channels we manage
              </span>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Every network, run end to end.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PLATFORMS.map((p, idx) => (
              <Reveal key={p.name} delay={(idx % 3) * 80}>
                <Tilt className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl text-black" style={{ backgroundColor: SWATCH }}>
                    {p.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                    {p.name} Management &amp; Marketing
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.body}</p>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SWATCH }} />
                Our packages
              </span>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Plans that scale with you.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PACKAGES.map((pkg, idx) => (
              <Reveal key={pkg.name} delay={idx * 80}>
                <div
                  className={[
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
                    pkg.featured ? "border-white/25 bg-white/[0.05]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/20",
                  ].join(" ")}
                >
                  {pkg.featured && (
                    <span className="absolute right-4 top-4 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-black" style={{ backgroundColor: SWATCH }}>
                      Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{pkg.blurb}</p>
                  <div className="mt-5 flex flex-1 flex-col gap-5 border-t border-white/[0.06] pt-5">
                    {pkg.groups.map((g) => (
                      <div key={g.label}>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">{g.label}</div>
                        <ul className="mt-2.5 flex flex-col gap-2">
                          {g.items.map((it) => (
                            <li key={it} className="flex items-start gap-2.5 text-sm text-white/75">
                              <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: SWATCH }} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M3 8.5l3 3 7-7" />
                              </svg>
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-white/15 text-sm font-semibold text-white transition-colors hover:border-white/35">
                    Get a free quote
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[#08080a] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Industries we cater</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Built for the sectors that move fast.
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, idx) => (
              <Reveal key={ind.name} delay={(idx % 3) * 70}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/20">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-black" style={{ backgroundColor: SWATCH }}>
                    {ind.name.charAt(0)}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{ind.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">{ind.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platform management + analytics (alternating) */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 sm:gap-24 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: SWATCH }}>01</span>
              <h3 className="mt-3 max-w-md text-balance text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
                Platforms, managed as one system
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65">
                Each network runs as its own channel — calendar, creative, scheduling, and community — but they ladder up to a single strategy so the brand shows up consistently everywhere your audience is.
              </p>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8" style={{ background: `radial-gradient(circle at 70% 20%, ${HUE}, transparent 60%), linear-gradient(135deg,#0a0a0b,#111114)` }}>
                <div className="grid grid-cols-3 gap-4">
                  {[<FacebookIcon key="f" />, <InstagramIcon key="i" />, <XIcon key="x" />, <LinkedInIcon key="l" />, <YouTubeIcon key="y" />, <TikTokIcon key="t" />].map((ic, i) => (
                    <span key={i} className="grid aspect-square place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:text-white" style={{ color: i % 2 ? SWATCH : undefined }}>
                      {ic}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right" className="lg:order-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: SWATCH }}>02</span>
              <h3 className="mt-3 max-w-md text-balance text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
                Analytics that drive the next post
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65">
                A data-driven approach to every channel: we review reach, engagement, and conversions monthly, then double down on what works and quietly retire what doesn&apos;t.
              </p>
            </Reveal>
            <Reveal direction="left" delay={100} className="lg:order-1">
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8" style={{ background: `radial-gradient(circle at 30% 20%, ${HUE}, transparent 60%), linear-gradient(135deg,#0a0a0b,#111114)` }}>
                <div className="flex items-end gap-3" style={{ height: 160 }}>
                  {[42, 68, 55, 90, 76, 100, 84].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: `linear-gradient(180deg, ${SWATCH}, ${SWATCH}33)` }} />
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <span>Reach</span><span>Engagement</span><span>Growth</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Result-oriented campaigns — animated counters */}
      <section className="bg-[#08080a] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Result-oriented ad campaigns.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Illustrative lifts from consistent organic + paid programs.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-3">
            {RESULTS.map((r) => (
              <div key={r.label} className="bg-black/40 px-6 py-8 text-center">
                <div className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: SWATCH }}>
                  <Counter value={r.value} />
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/45">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad gallery — static frames, each looping a real ad video */}
      <SocialAdGallery />

      {/* Organic vs Paid */}
      <section className="bg-[#08080a] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Organic and paid, working together.
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              { title: "Organic Social", items: ORGANIC },
              { title: "Paid Social", items: PAID },
            ].map((col) => (
              <Reveal key={col.title}>
                <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
                  <h3 className="text-lg font-semibold text-white">{col.title}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {col.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-white/75">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-black" style={{ backgroundColor: SWATCH }}>
                          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M3 8.5l3 3 7-7" />
                          </svg>
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6"><QuoteButton /></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose — comparison table */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Why choose this team?
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-12 overflow-x-auto">
              <div className="min-w-[640px] overflow-hidden rounded-3xl border border-white/[0.08]">
                <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr]">
                  <div className="bg-white/[0.02] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Capability
                  </div>
                  <div className="px-5 py-4 text-center text-sm font-bold text-black" style={{ backgroundColor: SWATCH }}>
                    Digital Otters
                  </div>
                  <div className="bg-white/[0.02] px-5 py-4 text-center text-sm font-semibold text-white/70">In-house</div>
                  <div className="bg-white/[0.02] px-5 py-4 text-center text-sm font-semibold text-white/70">Typical agency</div>
                  {COMPARISON.map((row) => (
                    <div key={row.feature} className="contents">
                      <div className="border-t border-white/[0.06] px-5 py-4 text-sm text-white/80">{row.feature}</div>
                      <div className="grid place-items-center border-t border-white/[0.06] px-5 py-4" style={{ backgroundColor: `${SWATCH}14` }}>
                        <MarkCell mark={row.otters} />
                      </div>
                      <div className="grid place-items-center border-t border-white/[0.06] px-5 py-4"><MarkCell mark={row.inhouse} /></div>
                      <div className="grid place-items-center border-t border-white/[0.06] px-5 py-4"><MarkCell mark={row.agency} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCTA
        tone="dark"
        eyebrow="Like what you see?"
        title="We can run social like this for your brand."
        body="This page is a Codlinx concept rebuild. Tell us what you're marketing and we'll come back with a plan, a team, and a price within 24 hours."
        primary={{ label: "Get a free quote", href: "/contact" }}
        secondary={{ label: "Back to portfolio", href: "/portfolio" }}
      />
    </>
  );
}
