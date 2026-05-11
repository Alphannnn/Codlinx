"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

const ACCENT = "#3FC9B4";

type Service = {
  slug: string;
  number: string;
  label: string;
  href: string;
  tagline: string;
  description: string;
  deliverables: string[];
  stack: string[];
  duration: string;
  engagement: string;
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    slug: "web",
    number: "01",
    label: "Web Development",
    href: "/services/web",
    tagline: "Production-grade web apps, built to scale.",
    description:
      "From marketing sites that convert to dashboards that handle millions of events — we ship full-stack web products engineered for the long haul.",
    deliverables: [
      "Type-safe Next.js + React applications",
      "Server-rendered, edge-deployed performance",
      "Custom CMS, admin panels, and dashboards",
      "API design, integrations, and data modeling",
    ],
    stack: ["Next.js", "React", "TypeScript", "Postgres", "Prisma", "tRPC"],
    duration: "6–16 weeks",
    engagement: "Fixed-scope · T&M",
    icon: <WebIcon />,
  },
  {
    slug: "mobile",
    number: "02",
    label: "Mobile Apps",
    href: "/services/mobile",
    tagline: "iOS, Android, and cross-platform that feels native.",
    description:
      "We build mobile apps that pass App Store review on day one — with the polish, offline behavior, and animations users expect from a category-leading product.",
    deliverables: [
      "Native iOS (Swift) and Android (Kotlin) builds",
      "Cross-platform apps in React Native and Expo",
      "Offline-first sync, push, deep linking",
      "App Store / Play Store submission & ASO",
    ],
    stack: ["React Native", "Expo", "Swift", "Kotlin", "Firebase"],
    duration: "10–20 weeks",
    engagement: "Fixed-scope · Retainer",
    icon: <MobileIcon />,
  },
  {
    slug: "cloud",
    number: "03",
    label: "Cloud & DevOps",
    href: "/services/cloud",
    tagline: "Infra that sleeps so your team can.",
    description:
      "We design cloud architectures that scale predictably and self-heal — with the observability you need to debug at 2am and the IaC discipline to roll back without panic.",
    deliverables: [
      "AWS / GCP / Azure architecture & migration",
      "Kubernetes, Terraform, GitHub Actions pipelines",
      "Observability: logs, metrics, tracing, alerts",
      "Cost optimization and reliability engineering",
    ],
    stack: ["AWS", "Kubernetes", "Terraform", "Datadog", "GitHub Actions"],
    duration: "4–12 weeks",
    engagement: "Retainer · SRE-on-call",
    icon: <CloudIcon />,
  },
  {
    slug: "ai",
    number: "04",
    label: "AI & Machine Learning",
    href: "/services/ai",
    tagline: "LLMs, RAG, and ML — shipped, not demoed.",
    description:
      "We turn AI prototypes into production systems with measurable quality, predictable cost, and the evaluation harnesses that keep regressions out.",
    deliverables: [
      "LLM integrations with Claude, GPT, and open models",
      "RAG pipelines with hybrid retrieval and citations",
      "Eval harnesses, A/B frameworks, and guardrails",
      "Custom ML models — training, serving, monitoring",
    ],
    stack: ["Anthropic", "OpenAI", "pgvector", "LangChain", "PyTorch"],
    duration: "8–14 weeks",
    engagement: "Discovery → Build",
    icon: <AIIcon />,
  },
  {
    slug: "design",
    number: "05",
    label: "UI / UX Design",
    href: "/services/design",
    tagline: "Interfaces that convert and feel inevitable.",
    description:
      "Brand systems, product UI, and conversion-led marketing surfaces — designed in the same room as the engineers who'll ship them, so nothing gets lost in handoff.",
    deliverables: [
      "Brand systems, identities, and design tokens",
      "Product UI / UX with prototype + handoff",
      "Conversion-led landing pages",
      "Design systems in Figma + code",
    ],
    stack: ["Figma", "Framer", "Storybook", "Motion"],
    duration: "4–10 weeks",
    engagement: "Sprint-based",
    icon: <DesignIcon />,
  },
  {
    slug: "strategy",
    number: "06",
    label: "Product Strategy",
    href: "/services/strategy",
    tagline: "Discovery, roadmaps, and go-to-market.",
    description:
      "We sit with your team for 2–4 weeks, talk to users, and come back with a roadmap that's actually shippable — sized, sequenced, and pressure-tested with engineering.",
    deliverables: [
      "User research and competitive teardowns",
      "Roadmap with phased scope and budgets",
      "Pricing, positioning, and GTM playbooks",
      "Engineering-validated estimates",
    ],
    stack: ["Research", "Roadmapping", "Workshops", "Estimates"],
    duration: "2–6 weeks",
    engagement: "Fixed-fee discovery",
    icon: <StrategyIcon />,
  },
];

export default function Services() {
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);
  const active = SERVICES.find((s) => s.slug === activeSlug) ?? SERVICES[0];

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-[#FAFAF7] py-24 text-zinc-900 sm:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(63,201,180,0.10), transparent 45%), radial-gradient(circle at 80% 100%, rgba(99,102,241,0.06), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-[340px_1fr] lg:gap-10">
          <ServiceList
            services={SERVICES}
            activeSlug={activeSlug}
            onSelect={setActiveSlug}
          />
          <ServiceDetail service={active} />
        </div>

        <FooterCTA />
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          Services
        </span>
        <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
          Everything you need to ship,{" "}
          <span className="relative inline-block">
            <span className="relative">under one roof.</span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-2 w-full rounded-full opacity-60"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
              }}
            />
          </span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          Six disciplines, one team. Pick a service to see what we deliver, the
          stack, and how engagements typically run.
        </p>
      </div>
    </div>
  );
}

function ServiceList({
  services,
  activeSlug,
  onSelect,
}: {
  services: Service[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <ul
      role="tablist"
      aria-label="Services"
      className="flex flex-col gap-1.5 rounded-2xl border border-zinc-900/[0.06] bg-white/70 p-2 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.18)] backdrop-blur-sm"
    >
      {services.map((service) => {
        const isActive = service.slug === activeSlug;
        return (
          <li key={service.slug}>
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`service-panel-${service.slug}`}
              id={`service-tab-${service.slug}`}
              onClick={() => onSelect(service.slug)}
              className={[
                "group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-3.5 text-left transition-all duration-300",
                isActive
                  ? "bg-zinc-900 text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]"
                  : "text-zinc-700 hover:bg-zinc-900/[0.04] hover:text-zinc-900",
              ].join(" ")}
            >
              <span
                className={[
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-300",
                  isActive
                    ? "bg-white/10 text-white"
                    : "bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200",
                ].join(" ")}
                style={isActive ? { color: ACCENT } : undefined}
              >
                {service.icon}
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className={[
                    "block text-[10px] font-semibold uppercase tracking-[0.22em]",
                    isActive ? "text-white/45" : "text-zinc-400",
                  ].join(" ")}
                >
                  {service.number}
                </span>
                <span className="mt-0.5 block text-[15px] font-semibold leading-tight">
                  {service.label}
                </span>
              </span>
              <svg
                viewBox="0 0 16 16"
                className={[
                  "h-3.5 w-3.5 shrink-0 transition-all duration-300",
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                ].join(" ")}
                style={isActive ? { color: ACCENT } : undefined}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div
      role="tabpanel"
      id={`service-panel-${service.slug}`}
      aria-labelledby={`service-tab-${service.slug}`}
      key={service.slug}
      className="codlinx-fade relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-7 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)] sm:p-10"
    >
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.18] blur-3xl"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="relative flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span
            className="grid h-12 w-12 place-items-center rounded-xl text-zinc-900"
            style={{
              backgroundColor: "rgba(63,201,180,0.12)",
              color: ACCENT,
            }}
          >
            {service.icon}
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {service.number} · Service
            </div>
            <h3 className="mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-[28px]">
              {service.label}
            </h3>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-lg font-medium leading-snug text-zinc-900 sm:text-xl">
          {service.tagline}
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
          {service.description}
        </p>
      </div>

      <div className="relative mt-9 grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:gap-10">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            What we deliver
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-[7px] grid h-4 w-4 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: "rgba(63,201,180,0.14)" }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-2.5 w-2.5"
                    style={{ color: ACCENT }}
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
                <span className="text-[15px] leading-relaxed text-zinc-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:min-w-[200px]">
          <Meta label="Typical timeline" value={service.duration} />
          <Meta label="Engagement" value={service.engagement} />
        </div>
      </div>

      <div className="relative mt-9 border-t border-zinc-900/[0.06] pt-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Stack &amp; tools
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {service.stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-900/[0.08] bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.06)]"
            >
              <span
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-8 flex flex-col items-start justify-between gap-4 border-t border-zinc-900/[0.06] pt-6 sm:flex-row sm:items-center">
        <p className="max-w-sm text-sm leading-relaxed text-zinc-600">
          Curious if this is the right fit? Tell us about your project — we&apos;ll
          come back with a scoped plan.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={service.href}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-900/30 hover:bg-zinc-50"
          >
            Learn more
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
          </Link>
          <Link
            href="/contact"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            Start a project
            <span
              className="grid h-6 w-6 place-items-center rounded-full"
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
          </Link>
        </div>
      </div>

      <style jsx>{`
        .codlinx-fade {
          animation: codlinx-svc-fade 320ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        @keyframes codlinx-svc-fade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-900/[0.06] bg-zinc-50 px-4 py-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-zinc-900">{value}</div>
    </div>
  );
}

function FooterCTA() {
  return (
    <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-900/[0.06] bg-white px-6 py-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.15)] sm:px-8">
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 place-items-center rounded-lg"
          style={{
            backgroundColor: "rgba(63,201,180,0.14)",
            color: ACCENT,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 3v18M3 12h18" />
          </svg>
        </span>
        <p className="text-sm font-medium text-zinc-800 sm:text-base">
          Not sure where to start? We&apos;ll figure it out together.
        </p>
      </div>
      <Link
        href="/contact"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:opacity-80"
      >
        Talk to a partner
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
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
  );
}

function WebIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 6.5h.01M10 6.5h.01" />
    </svg>
  );
}
function MobileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </svg>
  );
}
function CloudIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 18a5 5 0 0 1-.5-9.95A6 6 0 0 1 18 9a4 4 0 0 1 0 8H7z" />
    </svg>
  );
}
function AIIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3a4 4 0 0 0-4 4v1a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3V7a4 4 0 0 0-4-4z" />
      <path d="M12 8v8M9 12h6" />
    </svg>
  );
}
function DesignIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5a3 3 0 0 1-3 3h-1.5v1.5a3 3 0 0 1-3 3" />
      <circle cx="12.5" cy="11.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function StrategyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
