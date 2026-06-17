import PageHero from "../../components/PageHero";
import ClosingCTA from "../../components/ClosingCTA";
import CursorGlow from "../../components/CursorGlow";
import Reveal from "../../components/Reveal";
import ScrollProgress from "../../components/ScrollProgress";
import ClientGrid, { type ClientRow } from "../../components/ClientGrid";
import TestimonialCarousel from "../../components/TestimonialCarousel";

const ACCENT = "#3FC9B4";

export const metadata = {
  title: "Clients",
  description:
    "Companies we've partnered with — from Series A startups to the Fortune 500.",
  alternates: { canonical: "/work/clients" },
};

const CLIENTS: ClientRow[] = [
  { name: "Northwind", sector: "SaaS", since: "2024" },
  { name: "Traded", sector: "Fintech", since: "2024", featured: true, slug: "traded" },
  { name: "Zentap", sector: "PropTech", since: "2023", featured: true, slug: "zentap" },
  { name: "Upcoming Events", sector: "Events", since: "2024", featured: true, slug: "upcoming-events" },
  { name: "Quanta", sector: "Quant", since: "2022" },
  { name: "Event Staffing", sector: "Staffing", since: "2025", featured: true, slug: "event-staffing" },
  { name: "Orbis", sector: "Logistics", since: "2023" },
  { name: "Vela Mobility", sector: "Transport", since: "2024" },
  { name: "Greycroft", sector: "Venture", since: "2022" },
  { name: "Foundry & Co.", sector: "B2B SaaS", since: "2023" },
  { name: "Northstar Capital", sector: "Fintech", since: "2024" },
  { name: "Beacon Health", sector: "HealthTech", since: "2024" },
  { name: "Halcyon AI", sector: "AI", since: "2025" },
  { name: "Driftless", sector: "DTC", since: "2023" },
  { name: "Polaris Edu", sector: "EdTech", since: "2022" },
  { name: "Meridian Insurance", sector: "Insurtech", since: "2024" },
  { name: "Echo Robotics", sector: "Robotics", since: "2025" },
  { name: "Cascade Bio", sector: "BioTech", since: "2024" },
];

const TESTIMONIALS = [
  {
    quote:
      "We rebuilt our patient OS with Codlinx in 14 weeks. The team operated like senior employees, not vendors — they pushed back on scope when they should have, and shipped a system our clinicians actually use.",
    author: "Dr. Priya Menon",
    role: "VP Product · Nimbus Health",
  },
  {
    quote:
      "Codlinx ran our discovery in two weeks and saved us six months of building the wrong thing. The estimates were engineering-validated, the scope was sequenced, and the roadmap actually shipped.",
    author: "Marcus Field",
    role: "CEO · Atlas Trade",
  },
  {
    quote:
      "Our AI feature was stuck in demo purgatory until Codlinx built the eval harness. Three months later we have a production system with 94% citation accuracy and a cost dashboard our CFO loves.",
    author: "Inès Laurent",
    role: "Head of AI · Lumen Labs",
  },
  {
    quote:
      "The cost dashboard alone paid for the engagement. Six months in, our AWS bill is down 38% and the team finally sleeps through the night.",
    author: "Elena Rossi",
    role: "Head of Platform · Helios Energy",
  },
];

export default function ClientsPage() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />

      <PageHero
        eyebrow="Clients · 40+"
        title="Companies we've"
        highlight="partnered with."
        description="From seed-stage founders to Fortune 500 product teams. Every engagement is led by a partner; every line of code is written by a senior."
        stats={[
          { value: "40+", label: "Active clients" },
          { value: "12", label: "Industries" },
          { value: "4.9", label: "Avg rating" },
        ]}
        backHref="/work"
        backLabel="Back to work"
      />

      <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: ACCENT,
                      animation: "codlinx-grid-pulse 1.6s ease-in-out infinite",
                    }}
                  />
                  Selected clients
                </div>
                <h2 className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  A few of the teams we work with.
                </h2>
              </div>
              <span className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                {CLIENTS.length} of 120+
              </span>
            </div>
          </Reveal>

          <div className="mt-10">
            <ClientGrid clients={CLIENTS} />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-black py-20 text-white sm:py-28">
        <div
          aria-hidden
          className="codlinx-float-orb absolute left-[10%] top-1/4 -z-10 h-[460px] w-[460px] rounded-full opacity-[0.12] blur-[140px]"
          style={{ backgroundColor: ACCENT }}
        />
        <div
          aria-hidden
          className="codlinx-float-orb absolute right-[6%] top-1/2 -z-10 h-[340px] w-[340px] rounded-full opacity-[0.10] blur-[140px]"
          style={{ backgroundColor: "#8B5CF6", animationDelay: "-8s" }}
        />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  What they say
                </span>
                <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                  In their own words.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/65">
                Four quotes from four engagements, on rotation. Hover to pause.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12">
              <TestimonialCarousel items={TESTIMONIALS} />
            </div>
          </Reveal>
        </div>
      </section>

      <PartnershipModel />

      <ClosingCTA
        eyebrow="Become a client"
        title="Join the next 120."
        body="Tell us about your project. A senior team will come back to you inside 24 hours."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See industries", href: "/work/industries" }}
      />
    </>
  );
}

function PartnershipModel() {
  const items = [
    {
      title: "One partner, accountable",
      body: "A named partner runs every engagement end-to-end — strategy, scope, sequencing, ship.",
      stat: "1:1",
      label: "Partner per project",
    },
    {
      title: "Senior team, fully integrated",
      body: "We work inside your Slack, your repo, your stand-ups. No black-box vendor mode.",
      stat: "9 yrs",
      label: "Avg engineering tenure",
    },
    {
      title: "Receipts, not promises",
      body: "Every engagement starts with a metric. Reported on every Friday. No surprises.",
      stat: "100%",
      label: "Weekly reporting cadence",
    },
  ];
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
              How the partnership runs.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-600">
              Same operating model across forty-plus active clients.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90}>
              <li className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-7 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.28)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ backgroundColor: ACCENT }}
                />
                <div
                  className="text-4xl font-semibold tracking-tight sm:text-5xl"
                  style={{ color: ACCENT }}
                >
                  {it.stat}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {it.label}
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {it.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
