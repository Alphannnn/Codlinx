import PageHero from "../../components/PageHero";
import ClosingCTA from "../../components/ClosingCTA";
import Reveal from "../../components/Reveal";
import CursorGlow from "../../components/CursorGlow";
import WorkFilterGrid from "../../components/WorkFilterGrid";
import ScrollProgress from "../../components/ScrollProgress";
import { PROJECTS, ACCENT } from "../../lib/projects";

export const metadata = {
  title: "Case Studies",
  description:
    "Selected case studies from Codlinx. Real products, shipped to real users, with the numbers they moved.",
  alternates: { canonical: "/work/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />

      <PageHero
        eyebrow="Case studies"
        title="Work we're proud to"
        highlight="put our name on."
        description="Real products, shipped to real users. Each case study below documents the challenge, our approach, and the number we moved."
        stats={[
          { value: `${PROJECTS.length}`, label: "Featured studies" },
          { value: "120+", label: "Total shipped" },
          { value: "4.9", label: "Avg client rating" },
        ]}
        backHref="/work"
        backLabel="Back to work"
      />

      <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: ACCENT,
                      animation: "codlinx-grid-pulse 1.6s ease-in-out infinite",
                    }}
                  />
                  Live archive
                </div>
                <h2 className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Filter, search, find your closest fit.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">
                  Every study below is real. Filter by industry, service, or just type
                  what you&apos;re trying to ship — we&apos;ll surface the projects that
                  hit closest.
                </p>
              </div>
              <div className="hidden flex-col items-end text-right md:flex">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  Last shipped
                </span>
                <span className="mt-1 text-sm font-semibold text-zinc-900">
                  This week
                </span>
              </div>
            </div>
          </Reveal>

          <div className="mt-10">
            <WorkFilterGrid projects={PROJECTS} showServiceFilter showLayoutToggle />
          </div>
        </div>
      </section>

      <PrincipleStrip />

      <ClosingCTA
        eyebrow="Have something in mind?"
        title="Your case study could be next."
        body="Tell us what you're building. We come back inside 24 hours with a plan, a team, and a price."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See all clients", href: "/work/clients" }}
      />
    </>
  );
}

function PrincipleStrip() {
  const principles = [
    {
      title: "Receipts in week one",
      body: "The metric that matters is named and instrumented before code is written.",
    },
    {
      title: "Senior, integrated",
      body: "No bench warming, no juniors-by-default. The team you meet is the team that ships.",
    },
    {
      title: "Honest scope",
      body: "We say no to the wrong features so the right ones land — on time, on budget.",
    },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-black py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="codlinx-float-orb absolute left-[10%] top-1/3 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.16] blur-[140px]"
        style={{ backgroundColor: ACCENT }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
              Three principles every study follows.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              Different industries, different stacks — but the operating model is constant.
            </p>
          </div>
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <li className="group relative h-full overflow-hidden bg-black/60 p-7 transition-colors hover:bg-black/40">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-px left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: ACCENT }}
                />
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {p.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
