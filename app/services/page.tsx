import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ClosingCTA from "../components/ClosingCTA";
import Counter from "../components/Counter";
import Magnetic from "../components/Magnetic";
import CursorGlow from "../components/CursorGlow";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import Marquee from "../components/Marquee";
import { SERVICES_CONTENT } from "../lib/services";

const ACCENT = "#3FC9B4";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six disciplines, one senior team. Web, mobile, cloud, AI, design, and product strategy — shipped with the rigor of a product company, not a vendor.",
  alternates: { canonical: "/services" },
};

const SERVICE_VISUALS: Record<
  string,
  { image: string; alt: string; accent: string; outcome: string }
> = {
  web: {
    image:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=1600&q=80",
    alt: "Developer working on a code editor late at night",
    accent: "Production web",
    outcome: "p75 LCP under 1.2s on every launch",
  },
  mobile: {
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    alt: "Designer prototyping a mobile app interface",
    accent: "iOS · Android · Cross-platform",
    outcome: "App Store approvals on first submission",
  },
  cloud: {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    alt: "Server racks in a modern data center",
    accent: "AWS · GCP · Azure",
    outcome: "99.97% uptime delivered for production fleets",
  },
  ai: {
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    alt: "Abstract visualization of an AI neural network",
    accent: "LLMs · RAG · Evals",
    outcome: "Eval-gated rollouts with cost dashboards on day one",
  },
  design: {
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=80",
    alt: "Designer sketching interface flows on paper",
    accent: "Brand · Product · Motion",
    outcome: "Design systems shipped to your Figma and your repo",
  },
  strategy: {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    alt: "Cross-functional team working through a roadmap on a whiteboard",
    accent: "Discovery · Roadmap · GTM",
    outcome: "Roadmaps validated with engineering estimates, not vibes",
  },
  "graphic-design": {
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1600&q=80",
    alt: "Designer working on brand visuals and color palettes",
    accent: "Brand · Social · Ad creative",
    outcome: "Editable source files handed over with every project",
  },
  seo: {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    alt: "Analytics dashboard showing search traffic growth",
    accent: "Technical · Content · Authority",
    outcome: "Traffic that compounds into qualified pipeline",
  },
  "social-media": {
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1600&q=80",
    alt: "Phone showing a curated social media feed",
    accent: "Content · Community · Growth",
    outcome: "On-brand channels that grow without eating your week",
  },
  "social-media-marketing": {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    alt: "Paid social campaign dashboard with performance metrics",
    accent: "Meta · TikTok · LinkedIn",
    outcome: "Every dollar tied to a tracked conversion and ROAS",
  },
};

const HEADLINE_STATS = [
  { value: "120+", label: "Products shipped" },
  { value: "9 yrs", label: "Average senior tenure" },
  { value: "92", label: "NPS from clients" },
  { value: "24 hrs", label: "From brief to scoped plan" },
];

const CLIENT_LOGOS = [
  "Atlas Trade",
  "Nimbus Health",
  "Helios Energy",
  "Northstar Labs",
  "Lumen Retail",
  "Cobalt Robotics",
  "Halcyon Pay",
  "Vega Mobility",
];

const TRUST_CARDS = [
  {
    title: "Senior teams, no juniors hidden in the work",
    body:
      "Every engagement is staffed with engineers and designers who have shipped at scale. No bait-and-switch, no offshore subcontracting.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
    alt: "Senior software engineers reviewing code on a large monitor",
  },
  {
    title: "We write the runbook your team can read at 2 a.m.",
    body:
      "Documentation, IaC, observability, and clean handoff are non-negotiable. We design for the engineer who inherits the build, not for our retention.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    alt: "Engineers pair-programming and reviewing infrastructure diagrams",
  },
  {
    title: "Weekly ship, not quarterly reveal",
    body:
      "Friday demos to staging from week one. You see real software in your hands every sprint — surprises happen in week two, not week twelve.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
    alt: "Team gathered around a whiteboard during a sprint review",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Codlinx shipped what our last agency promised for nine months — in eleven weeks, with tests, observability, and a clean handoff. We hired their tech lead full-time after.",
    name: "Priya Sharma",
    role: "VP Engineering, Atlas Trade",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
    metric: "<90ms p99",
  },
  {
    quote:
      "They said the offline-first model would matter in week one and we didn't believe them. By month three it was the reason clinicians stopped opening tickets.",
    name: "Dr. Marcus Webb",
    role: "Chief Product Officer, Nimbus Health",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    metric: "−42% chart time",
  },
  {
    quote:
      "The cost dashboard alone paid for the engagement. Six months in, our AWS bill is down 38% and the team finally sleeps through the night.",
    name: "Elena Rossi",
    role: "Head of Platform, Helios Energy",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80",
    metric: "−38% cloud bill",
  },
];

const ENGAGEMENT_STEPS = [
  {
    step: "01",
    title: "Brief",
    body:
      "A 45-minute call. We listen, ask sharp questions, and you walk away with a written summary the same day.",
  },
  {
    step: "02",
    title: "Scoped plan",
    body:
      "Inside 24 hours: phased scope, named team, fixed price (or a T&M ceiling), and the risks we'd flag to a board.",
  },
  {
    step: "03",
    title: "Kickoff in 10 days",
    body:
      "Senior team in your Slack, repos initialized, design system seeded, and the first Friday demo on the calendar.",
  },
  {
    step: "04",
    title: "Ship + hand off",
    body:
      "Weekly to staging. Production behind feature flags. Runbooks, training, and a 30-day support tail at the end.",
  },
];

const CERTIFICATIONS = [
  { label: "SOC 2 Type II", sub: "Audited 2025" },
  { label: "ISO 27001", sub: "Certified" },
  { label: "AWS Advanced", sub: "Consulting Partner" },
  { label: "GDPR + HIPAA", sub: "Ready" },
  { label: "WCAG 2.2 AA", sub: "Default floor" },
];

const FAQS = [
  {
    q: "Do you take on existing codebases or only greenfield builds?",
    a: "Both. About half our work is rescue or hand-off engagements. We start with a paid two-week audit and return a written remediation plan before committing to a build.",
  },
  {
    q: "How quickly can you start?",
    a: "Typical kickoff is 10–14 days from signed SOW. For urgent rescues we've staffed inside 72 hours. Every engagement starts with the senior team you met in sales — not a swap.",
  },
  {
    q: "What does an engagement cost?",
    a: "Fixed-scope builds start around £45k for a defined MVP and scale to £400k+ for multi-quarter platform work. Retainers from £18k/month. You get the price, the team, and the plan in the same document.",
  },
  {
    q: "Where is your team based?",
    a: "Senior staff in London, Berlin, and Lisbon, with delivery support across the EU and UK. All engagements run in English, on a shared working window, with a named tech lead.",
  },
  {
    q: "Who owns the code we pay for?",
    a: "You do. Full IP transfer is in every contract. We retain no rights to the work — including infrastructure, design files, training data, and runbooks.",
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      <CursorGlow />

      <PageHero
        eyebrow="Services"
        title="Six disciplines."
        highlight="One senior studio."
        description="Web, mobile, cloud, AI, design, and product strategy — engineered with the rigor of a product company, priced and scoped like a partner you can actually plan around."
        stats={HEADLINE_STATS}
      >
        <div className="mt-8 flex items-center gap-2 text-xs font-medium text-white/65">
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
          Accepting new engagements — Q3 calendar booking now
        </div>
      </PageHero>

      <LogoMarquee />
      <ServicesShowcase />
      <OutcomesBand />
      <TrustSection />
      <Testimonials />
      <EngagementProcess />
      <Certifications />
      <FAQSection />

      <ClosingCTA
        eyebrow="Have something in mind?"
        title="A scoped plan in 24 hours."
        body="Tell us what you're building. A named partner will come back with a phased scope, a senior team, and a number."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See case studies", href: "/work" }}
      />
    </>
  );
}

function LogoMarquee() {
  return (
    <section className="border-y border-zinc-900/[0.06] bg-[#FAFAF7] py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
          <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Trusted by product teams at
          </p>
          <div className="w-full min-w-0">
            <Marquee>
              {CLIENT_LOGOS.map((name) => (
                <span
                  key={name}
                  className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-zinc-800"
                >
                  {name}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesShowcase() {
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                What we do
              </span>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                The full stack of a senior product studio.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-zinc-600">
              Pick the discipline you need, or talk to us about combining a few — most engagements run two or three in parallel.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 sm:gap-20">
          {SERVICES_CONTENT.map((service, idx) => {
            const visual = SERVICE_VISUALS[service.slug];
            const flipped = idx % 2 === 1;
            return (
              <Reveal key={service.slug} delay={Math.min(idx * 60, 240)}>
                <article className="group grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={flipped ? "lg:order-2" : ""}>
                    <div className="relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
                      <Image
                        src={visual.image}
                        alt={visual.alt}
                        width={1200}
                        height={800}
                        className="h-[360px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] sm:h-[440px]"
                        sizes="(min-width: 1024px) 560px, 100vw"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)",
                        }}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${ACCENT}33, transparent 55%)`,
                        }}
                      />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: ACCENT }}
                        />
                        {visual.accent}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-xs font-medium text-white/90 sm:text-sm">
                          <svg
                            viewBox="0 0 16 16"
                            className="h-4 w-4 shrink-0"
                            style={{ color: ACCENT }}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M3 8.5l3 3 7-7" />
                          </svg>
                          {visual.outcome}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={flipped ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-semibold tracking-[0.22em]"
                        style={{ color: ACCENT }}
                      >
                        {service.number}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                        Service
                      </span>
                    </div>
                    <h3 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                      <span className="relative inline-block">
                        <span className="relative">{service.label}</span>
                        <span
                          aria-hidden
                          className="absolute left-0 right-0 -bottom-1 h-[6px] origin-left scale-x-0 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-x-100"
                          style={{
                            background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
                          }}
                        />
                      </span>
                    </h3>
                    <p className="mt-4 max-w-xl text-lg font-medium leading-snug text-zinc-900">
                      {service.tagline}
                    </p>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600">
                      {service.description}
                    </p>

                    <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {service.deliverables.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[14px] leading-relaxed text-zinc-700"
                        >
                          <span
                            className="mt-[7px] grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full"
                            style={{
                              backgroundColor: "rgba(63,201,180,0.16)",
                            }}
                          >
                            <svg
                              viewBox="0 0 16 16"
                              className="h-2 w-2"
                              style={{ color: ACCENT }}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M3 8.5l3 3 7-7" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <Magnetic>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group/btn inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black"
                        >
                          <span className="magnetic-inner inline-flex items-center gap-2">
                            Explore {service.label.toLowerCase()}
                            <span
                              className="grid h-6 w-6 place-items-center rounded-full transition-transform duration-300 group-hover/btn:translate-x-0.5"
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
                                <path d="M3 8h10M9 4l4 4-4 4" />
                              </svg>
                            </span>
                          </span>
                        </Link>
                      </Magnetic>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span>
                          <span className="font-semibold text-zinc-800">
                            {service.duration}
                          </span>{" "}
                          timeline
                        </span>
                        <span className="h-3 w-px bg-zinc-300" />
                        <span>{service.engagement}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OutcomesBand() {
  const outcomes = [
    { value: "−38%", label: "Median cloud cost reduction" },
    { value: "1.2s", label: "p75 LCP at launch" },
    { value: "99.97%", label: "Production fleet uptime" },
    { value: "120+", label: "Products shipped to date" },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-black py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="codlinx-float-orb absolute left-[8%] top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-[0.18] blur-[140px]"
        style={{ backgroundColor: ACCENT }}
      />
      <div
        aria-hidden
        className="codlinx-float-orb absolute right-[6%] top-[20%] -z-10 h-[360px] w-[360px] rounded-full opacity-[0.10] blur-[140px]"
        style={{
          backgroundColor: "#6366F1",
          animationDelay: "-7s",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
              Outcomes you can defend in a board meeting.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              Every engagement ships with measurable success criteria — agreed in week one, reported on weekly.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] lg:grid-cols-4">
            {outcomes.map((o, idx) => (
              <div
                key={o.label}
                className="group relative bg-black/60 px-6 py-7 transition-colors duration-300 hover:bg-black/40"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${ACCENT}1f, transparent 60%)`,
                  }}
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
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              Why teams trust us
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              How we earn the keys to your codebase.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
              We do the boring, hard work other studios skip — the testing, the documentation, the on-call. The result is software your team can run after we&apos;ve gone.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TRUST_CARDS.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 100}>
              <Tilt
                max={6}
                scale={1.015}
                glare={false}
                className="group relative h-full overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white shadow-[0_18px_45px_-30px_rgba(0,0,0,0.25)]"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={900}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-10 -top-10 h-32 -skew-x-12 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                    }}
                  />
                  <span
                    className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-xl text-black shadow-lg"
                    style={{ backgroundColor: ACCENT }}
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8.5l3 3 7-7" />
                    </svg>
                  </span>
                </div>
                <div className="relative p-6 sm:p-7">
                  <h3 className="text-xl font-semibold leading-snug tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {card.body}
                  </p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-[#FAFAF7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                Client voices
              </span>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                The team that came back to hire us again.
              </h2>
            </div>
            <Link
              href="/work/case-studies"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:opacity-80"
            >
              Read full case studies
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
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

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <Reveal key={t.name} delay={idx * 110}>
              <Tilt
                max={5}
                scale={1.01}
                glare={false}
                className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-7 shadow-[0_12px_40px_-30px_rgba(0,0,0,0.25)] sm:p-8"
              >
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    style={{ color: ACCENT }}
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M7 7h4v4H8.5c0 2.2 1 3 3 3v3c-4 0-6-2-6-6V7zm9 0h4v4h-2.5c0 2.2 1 3 3 3v3c-4 0-6-2-6-6V7z" />
                  </svg>
                  <blockquote className="mt-4 text-[17px] font-medium leading-relaxed tracking-tight text-zinc-900">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-zinc-900/[0.06] pt-5">
                  <div className="relative h-12 w-12 shrink-0">
                    <span
                      aria-hidden
                      className="absolute -inset-1 rounded-full opacity-30 blur-md"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={56}
                      height={56}
                      className="relative h-12 w-12 rounded-full object-cover ring-2 ring-white"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-zinc-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                  <span
                    className="rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold"
                    style={{ color: ACCENT }}
                  >
                    {t.metric}
                  </span>
                </figcaption>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EngagementProcess() {
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal direction="left">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)]">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80"
                alt="Founder and engineering lead in a kickoff meeting at a sunlit table"
                width={1400}
                height={1600}
                className="h-full max-h-[560px] w-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-[1.04]"
                sizes="(min-width: 1024px) 500px, 100vw"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-white backdrop-blur-md">
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
                <span className="text-xs font-medium">
                  Avg. response in 4h 12m · London / Berlin / Lisbon
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                How engagements run
              </span>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Brief on Monday. Senior team in your Slack by week two.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-zinc-600">
                No 60-page proposal cycle. No discovery deck dressed up as work. Here&apos;s the actual sequence from first call to first shipped commit.
              </p>

              <ol className="mt-10 flex flex-col gap-5">
                {ENGAGEMENT_STEPS.map((s, idx) => (
                  <Reveal key={s.step} delay={idx * 90} direction="up">
                    <li className="group flex gap-5 rounded-2xl border border-zinc-900/[0.06] bg-white p-5 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.22)] sm:p-6">
                      <div
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-black transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {s.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">
                          {s.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="border-y border-zinc-900/[0.06] bg-white py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Compliance &amp; standards
              </p>
              <p className="mt-2 text-base font-medium text-zinc-800">
                The non-negotiables we hold ourselves to — and ship into every codebase.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {CERTIFICATIONS.map((c, idx) => (
                <Reveal key={c.label} delay={idx * 70}>
                  <li className="group relative overflow-hidden rounded-xl border border-zinc-900/[0.06] bg-[#FAFAF7] px-4 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/15 hover:shadow-[0_10px_24px_-20px_rgba(0,0,0,0.2)]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(63,201,180,0.18), transparent)",
                      }}
                    />
                    <div className="relative text-sm font-semibold tracking-tight text-zinc-900">
                      {c.label}
                    </div>
                    <div className="relative mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                      {c.sub}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            FAQ
          </span>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            The questions clients ask us before signing.
          </h2>
        </Reveal>
        <dl className="mt-10 divide-y divide-zinc-200">
          {FAQS.map((f, idx) => (
            <Reveal key={f.q} delay={idx * 60}>
              <details className="group py-5 [&[open]_summary_svg]:rotate-180">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <dt className="text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-zinc-700">
                    {f.q}
                  </dt>
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_8px_-3px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-110"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5 text-zinc-600 transition-transform duration-300"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>
                <dd className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
                  {f.a}
                </dd>
              </details>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
