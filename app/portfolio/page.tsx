import type { Metadata } from "next";
import Link from "next/link";
import CursorGlow from "../components/CursorGlow";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import ClosingCTA from "../components/ClosingCTA";
import WhyChooseIcon from "../components/WhyChooseIcon";
import {
  ACCENT,
  PORTFOLIO_GROUPS,
  PORTFOLIO_PAGES,
  WHY_CHOOSE,
} from "./lib/content";

export const metadata: Metadata = {
  title: "Portfolio — Digital marketing site, rebuilt in the Codlinx language",
  description:
    "A portfolio concept: a full digital-marketing agency website — social, SEO, web development, paid ads, and tools — reimagined end to end in the Codlinx premium design system.",
  alternates: { canonical: "/portfolio" },
};

const PARTNERS = [
  "Google",
  "Meta",
  "TikTok",
  "LinkedIn",
  "Bing",
  "Snapchat",
  "X",
  "Amazon",
];

const INDUSTRIES = [
  "Real Estate",
  "E-commerce",
  "Healthcare",
  "Finance",
  "Hospitality",
  "SaaS",
  "Education",
  "Local Services",
];

export default function PortfolioLanding() {
  return (
    <>
      <CursorGlow />

      {/* Hero */}
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
          className="codlinx-float-orb absolute left-1/2 top-[-220px] -z-10 h-[520px] w-[1000px] -translate-x-1/2 rounded-full opacity-25 blur-[140px]"
          style={{
            background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
          }}
        />

        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            Portfolio · concept rebuild
          </span>

          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]">
            Digital marketing, web development &amp; cloud —{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(120deg, ${ACCENT}, #ffffff)`,
              }}
            >
              reimagined in the Codlinx language.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            We took a complete digital-marketing agency site — expert web
            development, SEO, social media management, and PPC — and rebuilt
            every page end to end in our premium design system. Explore it the
            way a visitor would, then imagine it as yours.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#offerings"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              Explore the build
              <span
                className="grid h-7 w-7 place-items-center rounded-full"
                style={{ backgroundColor: ACCENT }}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </span>
            </Link>
            <a
              href="https://www.digitalotters.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-white/85 transition-colors duration-200 hover:border-white/35 hover:text-white"
            >
              View the original concept
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
                <path d="M6 3h7v7M13 3L4 12" />
              </svg>
            </a>
          </div>

          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-4">
            {[
              { value: `${PORTFOLIO_PAGES.length}`, label: "Pages rebuilt" },
              { value: "6", label: "Service categories" },
              { value: "360°", label: "Marketing coverage" },
              { value: "1", label: "Design language" },
            ].map((s) => (
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
        </div>
      </section>

      {/* Partner marquee */}
      <section className="border-y border-white/[0.06] bg-[#08080a] py-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="mb-7 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Strategic platform partnerships
          </p>
          <Marquee gapClass="gap-10 sm:gap-16">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="shrink-0 text-lg font-semibold tracking-tight text-white/35 transition-colors hover:text-white/70 sm:text-xl"
              >
                {p}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Offerings grid */}
      <section id="offerings" className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  Every page in the build
                </span>
                <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  The full menu, rebuilt page by page.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/55">
                Each link below is a complete page — the same offering as the
                source site, rebuilt in the Codlinx dark/teal system.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 flex flex-col gap-12">
            {PORTFOLIO_GROUPS.map((g) => (
              <div key={g.group}>
                <Reveal>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                      {g.group}
                    </span>
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>
                </Reveal>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {g.pages.map((p, idx) => (
                    <Reveal key={p.slug} delay={(idx % 3) * 80}>
                      <Link
                        href={`/portfolio/${p.slug}`}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
                      >
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -inset-x-12 -top-12 h-32 -skew-x-12 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${p.hue}, transparent)`,
                          }}
                        />
                        <div className="relative flex h-full flex-col">
                          <span
                            className="grid h-10 w-10 place-items-center rounded-xl text-sm font-bold text-black"
                            style={{ backgroundColor: p.swatch }}
                          >
                            {p.navLabel.charAt(0)}
                          </span>
                          <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                            {p.navLabel}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                            {p.navDescription}
                          </p>
                          <span
                            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
                            style={{ color: p.swatch }}
                          >
                            View page
                            <svg
                              viewBox="0 0 16 16"
                              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
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
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[#08080a] py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  Industries served
                </span>
                <h3 className="mt-3 max-w-md text-balance text-2xl font-semibold tracking-tight text-white">
                  Built for the sectors that move fast.
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {INDUSTRIES.map((ind) => (
                  <span
                    key={ind}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/75"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
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
                      background: `linear-gradient(90deg, transparent, rgba(63,201,180,0.18), transparent)`,
                    }}
                  />
                  <div className="relative">
                    <span className="relative grid h-12 w-12 place-items-center">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60"
                        style={{ backgroundColor: ACCENT }}
                      />
                      <span
                        className="relative grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5"
                        style={{
                          backgroundColor: `${ACCENT}1f`,
                          color: ACCENT,
                          boxShadow: `inset 0 0 0 1px ${ACCENT}59`,
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

      <ClosingCTA
        tone="dark"
        eyebrow="A portfolio concept by Codlinx"
        title="Want a site like this for your brand?"
        body="This entire section is a concept rebuild in our design system. Tell us what you're marketing — we'll come back with a plan, a team, and a price within 24 hours."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See our real work", href: "/work" }}
      />
    </>
  );
}
