import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ClosingCTA from "../components/ClosingCTA";
import Counter from "../components/Counter";
import CursorGlow from "../components/CursorGlow";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import Parallax from "../components/Parallax";
import WorkFilterGrid from "../components/WorkFilterGrid";
import ScrollProgress from "../components/ScrollProgress";
import { PROJECTS, ACCENT, type Project } from "../lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Codlinx. Real products, shipped to real users — and the numbers they moved.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <>
      <CursorGlow />
      <ScrollProgress />

      <PageHero
        eyebrow="Work · 2025"
        title="Work we're proud to"
        highlight="put our name on."
        description="Real products, shipped to real users. Eight live case studies below — open the live URL on each one and see what we built."
        stats={[
          { value: "8", label: "Featured case studies" },
          { value: "Live", label: "All in production" },
          { value: "4.9", label: "Avg client rating" },
          { value: "9 yrs", label: "Senior tenure" },
        ]}
        backHref="/"
        backLabel="Back to home"
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/75 backdrop-blur-md">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="codlinx-pulse-ring absolute inset-0 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
            </span>
            Currently in flight — {featured.client} ({featured.industry})
          </div>
          <Link
            href="/work/case-studies"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 text-xs font-semibold text-white/85 backdrop-blur-md transition-colors hover:border-white/30"
          >
            All case studies
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
          </Link>
          <Link
            href="/work/industries"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 text-xs font-semibold text-white/85 backdrop-blur-md transition-colors hover:border-white/30"
          >
            Industries
          </Link>
          <Link
            href="/work/clients"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 text-xs font-semibold text-white/85 backdrop-blur-md transition-colors hover:border-white/30"
          >
            Clients
          </Link>
        </div>
      </PageHero>

      <KineticBrandStrip />
      <FeaturedSpotlight project={featured} />
      <PortfolioSection projects={rest} />
      <OutcomesStrip />
      <NextSteps />

      <ClosingCTA
        eyebrow="Have something in mind?"
        title="Your case study could be next."
        body="Tell us what you're building. We come back inside 24 hours with a plan, a team, and a price."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "All clients", href: "/work/clients" }}
      />
    </>
  );
}

function KineticBrandStrip() {
  const logos = [
    "Traded",
    "Zentap",
    "Upcoming Events",
    "Event Staffing",
  ];
  return (
    <section className="relative isolate overflow-hidden border-y border-zinc-900/[0.06] bg-[#FAFAF7] py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FAFAF7] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FAFAF7] to-transparent"
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
          <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Trusted by product teams at
          </p>
          <div className="w-full min-w-0">
            <Marquee>
              {logos.map((name) => (
                <span
                  key={name}
                  className="group relative whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-zinc-900"
                >
                  <span className="relative">
                    {name}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                  </span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedSpotlight({ project }: { project: Project }) {
  return (
    <section className="relative isolate bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.10] blur-[140px]"
        style={{ backgroundColor: ACCENT }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: ACCENT,
                    animation: "codlinx-grid-pulse 1.6s ease-in-out infinite",
                  }}
                />
                Featured · {project.year}
              </span>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                The one we lead with.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600">
                A flagship engagement that captures how the studio works — senior team, real numbers, no theatre.
              </p>
            </div>
            <Link
              href={`/work/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-900"
            >
              <span className="relative">
                Read full case study
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100"
                  style={{ backgroundColor: ACCENT }}
                />
              </span>
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Link
            href={`/work/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 grid grid-cols-1 overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white shadow-[0_28px_80px_-40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:shadow-[0_44px_100px_-40px_rgba(0,0,0,0.42)] lg:grid-cols-[1.1fr_1fr]"
          >
            <div className="relative h-[300px] overflow-hidden bg-zinc-950 sm:h-[460px] lg:h-auto">
              <Parallax speed={0.06}>
                <Image
                  src={project.heroImage}
                  alt={project.heroAlt}
                  width={1600}
                  height={1100}
                  className="h-full w-full scale-[1.08] object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.16]"
                  sizes="(min-width: 1024px) 700px, 100vw"
                  priority
                />
              </Parallax>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.65) 100%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${project.hue}, transparent 60%)`,
                }}
              />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: project.swatch }}
                />
                {project.industry} · Featured
              </div>
              <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-2">
                {project.tags.slice(0, 4).map((t, i) => (
                  <span
                    key={t}
                    className="inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/85 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col justify-between gap-10 p-8 sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute right-6 top-6 hidden h-24 w-24 rounded-full opacity-[0.07] blur-2xl lg:block"
                style={{ backgroundColor: project.swatch }}
              />
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  {project.industry} · {project.duration} · {project.location}
                </div>
                <div className="mt-5 text-sm font-semibold uppercase tracking-wider text-zinc-700">
                  {project.client}
                </div>
                <h3 className="mt-3 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-900 sm:text-[34px]">
                  {project.title}
                </h3>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600">
                  {project.summary}
                </p>
              </div>

              <div className="flex items-end justify-between gap-6 border-t border-zinc-900/[0.06] pt-6">
                <div>
                  <div
                    className="text-4xl font-semibold tracking-tight sm:text-5xl"
                    style={{ color: project.swatch }}
                  >
                    <Counter value={project.metric.value} />
                  </div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    {project.metric.label}
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  Read case study
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:scale-110"
                    style={{ backgroundColor: project.swatch }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3 w-3 text-white"
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
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function PortfolioSection({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-white py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  The portfolio
                </div>
                <h2 className="mt-2 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Filter the work. Find your closest fit.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-600">
                  Seven more shipped products — filterable by industry, service, or what you&apos;re searching for. Each one live, each one open in a new tab.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <WorkFilterGrid projects={projects} showServiceFilter showLayoutToggle />
        </div>
      </div>
    </section>
  );
}

function OutcomesStrip() {
  const outcomes = [
    { value: "8", label: "Products live in production" },
    { value: "Full-stack", label: "Default delivery scope" },
    { value: "Multi-year", label: "Longest engagement" },
    { value: "Remote", label: "Distributed by default" },
  ];
  const ticker = [
    "120+ products shipped",
    "12 industries served",
    "40+ active clients",
    "4.9 avg client rating",
    "9-year senior tenure",
    "24-hour response SLA",
  ];

  return (
    <section className="relative isolate overflow-hidden bg-black py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="codlinx-float-orb absolute left-[10%] top-1/2 -z-10 h-[460px] w-[460px] -translate-y-1/2 rounded-full opacity-[0.16] blur-[140px]"
        style={{ backgroundColor: ACCENT }}
      />
      <div
        aria-hidden
        className="codlinx-float-orb absolute right-[8%] top-1/3 -z-10 h-[340px] w-[340px] rounded-full opacity-[0.10] blur-[140px]"
        style={{ backgroundColor: "#8B5CF6", animationDelay: "-7s" }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
              Numbers we&apos;ve put on the board.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              Each case study has the receipts — agreed in week one, reported on weekly.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] lg:grid-cols-4">
            {outcomes.map((o, idx) => (
              <div
                key={o.label}
                className="group relative overflow-hidden bg-black/60 px-6 py-7 transition-colors duration-300 hover:bg-black/40"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${ACCENT}1f, transparent 60%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-px left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: ACCENT }}
                />
                <dt className="relative text-[11px] uppercase tracking-[0.2em] text-white/45">
                  {o.label}
                </dt>
                <dd
                  className="relative mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
                  style={{ color: ACCENT }}
                >
                  <Counter value={o.value} delay={idx * 120} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="codlinx-marquee mt-12 overflow-hidden border-y border-white/[0.06] py-5">
          <div className="codlinx-ticker flex w-max items-center gap-12 will-change-transform">
            {[...ticker, ...ticker].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="flex items-center gap-12 text-xs font-semibold uppercase tracking-[0.32em] text-white/55"
              >
                {t}
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NextSteps() {
  const links = [
    {
      title: "Case studies",
      blurb: "Deep dives into the eight shipped products we lead with.",
      href: "/work/case-studies",
      label: "Browse case studies",
      meta: "08",
    },
    {
      title: "Industries",
      blurb: "Twelve verticals, one operating model. See which one is yours.",
      href: "/work/industries",
      label: "Explore industries",
      meta: "12",
    },
    {
      title: "Clients",
      blurb: "The companies we work with — and what they say about us.",
      href: "/work/clients",
      label: "Meet our clients",
      meta: "40+",
    },
  ];
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Keep exploring
          </div>
          <h2 className="mt-2 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Three ways into the work.
          </h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {links.map((l, i) => (
            <Reveal key={l.href} delay={i * 80}>
              <Link
                href={l.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-7 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.3)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ backgroundColor: ACCENT }}
                />
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                    {l.meta}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-zinc-900/10 text-zinc-700 transition-all duration-300 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
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
                <h3 className="mt-12 text-2xl font-semibold tracking-tight">
                  {l.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {l.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                  {l.label}
                  <span
                    aria-hidden
                    className="block h-px w-6 origin-left scale-x-100 transition-transform duration-500 group-hover:w-10"
                    style={{ backgroundColor: ACCENT }}
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
