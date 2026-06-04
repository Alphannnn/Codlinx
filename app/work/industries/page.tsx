import Link from "next/link";
import PageHero from "../../components/PageHero";
import ClosingCTA from "../../components/ClosingCTA";
import CursorGlow from "../../components/CursorGlow";
import Reveal from "../../components/Reveal";
import ScrollProgress from "../../components/ScrollProgress";
import IndustryShowcase, { type IndustryItem } from "../../components/IndustryShowcase";
import { PROJECTS } from "../../lib/projects";

const ACCENT = "#3FC9B4";

export const metadata = {
  title: "Industries",
  description:
    "Fintech, health, AI, IoT, and beyond — twelve industries where Codlinx ships production software.",
  alternates: { canonical: "/work/industries" },
};

const INDUSTRIES: (IndustryItem & { swatch?: string })[] = [
  {
    slug: "fintech",
    name: "Fintech",
    swatch: "#8B5CF6",
    blurb:
      "Trading platforms, embedded payments, KYC pipelines. Sub-100ms latency budgets and regulators in the room.",
    highlights: [
      "Real-time market data at 1.4M ticks/sec",
      "PSD2 / Open Banking integrations",
      "SOC 2-ready architecture",
    ],
    caseStudySlug: "traded",
    caseStudyLabel: "See Traded case study",
  },
  {
    slug: "health",
    name: "HealthTech",
    swatch: "#3FC9B4",
    blurb:
      "Patient records, clinician apps, and remote-care platforms — built for HIPAA from the schema up.",
    highlights: [
      "HIPAA-compliant data planes",
      "FHIR-native patient records",
      "Offline-first clinician apps",
    ],
    caseStudySlug: "event-staffing",
    caseStudyLabel: "See Event Staffing case study",
  },
  {
    slug: "ai",
    name: "AI",
    swatch: "#F472B6",
    blurb:
      "RAG, LLM products, and ML systems that survive contact with users. Eval-first, cost-aware, citation-bound.",
    highlights: [
      "94% citation accuracy on enterprise RAG",
      "Prompt caching + model routing",
      "Eval harnesses + red-team pipelines",
    ],
    caseStudySlug: "assemble",
    caseStudyLabel: "See Assemble case study",
  },
  {
    slug: "iot",
    name: "IoT",
    swatch: "#FBBF24",
    blurb:
      "Device fleets, anomaly detection, and edge-to-cloud pipelines that handle a million events a minute.",
    highlights: [
      "1.2M events/min Kafka pipelines",
      "Multi-region failover playbooks",
      "Operator dashboards with role-based runbooks",
    ],
    caseStudySlug: "cancelo",
    caseStudyLabel: "See Cancelo case study",
  },
  {
    slug: "saas",
    name: "B2B SaaS",
    swatch: "#6366F1",
    blurb:
      "Multi-tenant platforms, billing, RBAC, and the unsexy plumbing that turns a product into a business.",
    highlights: [
      "Multi-tenant data isolation",
      "Stripe billing & dunning",
      "SSO, SCIM, audit logs",
    ],
  },
  {
    slug: "edtech",
    name: "EdTech",
    swatch: "#22D3EE",
    blurb:
      "Learning platforms, assessments, and AI-tutored content — built for accessibility and trust.",
    highlights: [
      "WCAG AA accessibility floor",
      "FERPA-aware data handling",
      "AI tutoring with citation contracts",
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    swatch: "#F59E0B",
    blurb:
      "Routing, dispatch, and real-time fleet visibility. Software that survives spotty 4G and angry drivers.",
    highlights: [
      "Offline-first dispatch apps",
      "Optimised multi-stop routing",
      "Live ETAs at fleet scale",
    ],
  },
  {
    slug: "commerce",
    name: "Commerce",
    swatch: "#A78BFA",
    blurb:
      "Headless storefronts, checkout, subscriptions, and the post-purchase experience that earns repeat buyers.",
    highlights: [
      "Headless Shopify + custom OMS",
      "Sub-second LCP on PDPs",
      "Subscription billing & retention loops",
    ],
    caseStudySlug: "go-outfitter",
    caseStudyLabel: "See Go Outfitter case study",
  },
  {
    slug: "media",
    name: "Media",
    swatch: "#FB7185",
    blurb:
      "Editorial systems, video pipelines, and personalisation engines that respect the reader.",
    highlights: [
      "Custom CMS for editorial teams",
      "Personalisation without dark patterns",
      "Video pipelines at archive scale",
    ],
  },
  {
    slug: "energy",
    name: "Energy",
    swatch: "#FACC15",
    blurb:
      "Asset monitoring, grid optimisation, and the data infrastructure behind the energy transition.",
    highlights: [
      "Fleet-scale telemetry pipelines",
      "Predictive maintenance models",
      "Operator-grade dashboards",
    ],
  },
  {
    slug: "insurtech",
    name: "Insurtech",
    swatch: "#34D399",
    blurb:
      "Quote-to-bind platforms, claims automation, and the underwriting workflows that turn weeks into minutes.",
    highlights: [
      "Quote-to-bind in under 5 minutes",
      "Document AI + claims automation",
      "Regulator-friendly audit trails",
    ],
  },
  {
    slug: "biotech",
    name: "BioTech",
    swatch: "#60A5FA",
    blurb:
      "Lab software, sample tracking, and ML-augmented research tools. Built with the long tail of compliance in mind.",
    highlights: [
      "21 CFR Part 11-aware systems",
      "LIMS integrations",
      "Reproducible ML pipelines",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />

      <PageHero
        eyebrow="Industries · 12"
        title="Twelve industries,"
        highlight="one operating model."
        description="The shape of the team is the same — senior, integrated, embedded with yours. What changes is the domain we step into."
        stats={[
          { value: "12", label: "Industries served" },
          { value: "40+", label: "Active clients" },
          { value: "120+", label: "Products shipped" },
        ]}
        backHref="/work"
        backLabel="Back to work"
      />

      <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: ACCENT,
                      animation: "codlinx-grid-pulse 1.6s ease-in-out infinite",
                    }}
                  />
                  Pick a vertical
                </div>
                <h2 className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Hover an industry — get the texture.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-600">
                Each vertical comes with its own constraints, its own bar. The
                operating model bends to the domain — never the other way around.
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            <IndustryShowcase items={INDUSTRIES} />
          </div>
        </div>
      </section>

      <IndustryGrid items={INDUSTRIES} />

      <section className="relative isolate overflow-hidden bg-black py-20 text-white sm:py-28">
        <div
          aria-hidden
          className="codlinx-float-orb absolute left-[8%] top-1/3 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.16] blur-[140px]"
          style={{ backgroundColor: ACCENT }}
        />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
                Same operating model. Different domains.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-white/65">
                Whatever the vertical, the playbook holds: senior team, integrated, with a metric on day one.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] lg:grid-cols-4">
              {[
                { v: "12", l: "Industries shipped" },
                { v: "120+", l: "Products live" },
                { v: "40+", l: "Active clients" },
                { v: "4.9", l: "Avg client rating" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="group relative overflow-hidden bg-black/60 px-6 py-7 transition-colors hover:bg-black/40"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-px left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                    {s.l}
                  </dt>
                  <dd
                    className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
                    style={{ color: ACCENT }}
                  >
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <ClosingCTA
        eyebrow="Not on the list?"
        title="We've shipped in stranger places."
        body="If your industry has hard problems and real users, the operating model still applies. Tell us about it."
        primary={{ label: "Talk to a partner", href: "/contact" }}
        secondary={{ label: "All case studies", href: "/work/case-studies" }}
      />
    </>
  );
}

function IndustryGrid({ items }: { items: (IndustryItem & { swatch?: string })[] }) {
  return (
    <section className="bg-white py-20 text-zinc-900 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-zinc-900/[0.06] pb-5">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Full directory
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Every industry, at a glance.
              </h2>
            </div>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              {items.length} verticals
            </span>
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((ind, i) => {
            const linkedProject = ind.caseStudySlug
              ? PROJECTS.find((p) => p.slug === ind.caseStudySlug)
              : undefined;
            return (
              <Reveal key={ind.slug} delay={(i % 3) * 80}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-white p-7 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.25)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{ backgroundColor: ind.swatch ?? ACCENT }}
                  />
                  <div className="flex items-start justify-between">
                    <div
                      className="grid h-10 w-10 place-items-center rounded-lg text-sm font-bold text-black transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                      style={{ backgroundColor: ind.swatch ?? ACCENT }}
                    >
                      {ind.name.slice(0, 2)}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {ind.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {ind.blurb}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {ind.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-zinc-700">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: ind.swatch ?? ACCENT }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    {linkedProject ? (
                      <Link
                        href={`/work/${linkedProject.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900"
                      >
                        <span className="relative">
                          Read case: {linkedProject.client}
                          <span
                            aria-hidden
                            className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100"
                            style={{ backgroundColor: ind.swatch ?? ACCENT }}
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
                    ) : (
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-900"
                      >
                        Talk to a partner
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3.5 w-3.5"
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
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
