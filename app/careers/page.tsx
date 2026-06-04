import Link from "next/link";
import PageHero from "../components/PageHero";
import ClosingCTA from "../components/ClosingCTA";

const ACCENT = "#3FC9B4";

export const metadata = {
  title: "Careers",
  description:
    "Join Codlinx. Senior engineers, designers, and product leads — London, Lahore, and remote.",
};

const ROLES = [
  {
    slug: "senior-fullstack",
    title: "Senior Full-stack Engineer",
    team: "Engineering",
    location: "London / Remote",
    type: "Full-time",
    summary:
      "Ship production-grade Next.js + TypeScript on the products our clients bet on.",
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    team: "AI & ML",
    location: "Lahore / Remote",
    type: "Full-time",
    summary:
      "Design RAG pipelines, eval harnesses, and LLM systems that survive production.",
  },
  {
    slug: "senior-mobile",
    title: "Senior Mobile Engineer",
    team: "Mobile",
    location: "Remote (UTC±5)",
    type: "Full-time",
    summary:
      "React Native + native iOS/Android. Offline-first, animation-fluent, App Store seasoned.",
  },
  {
    slug: "senior-designer",
    title: "Senior Product Designer",
    team: "Design",
    location: "London",
    type: "Full-time",
    summary:
      "Brand systems and product UI that ship — in Figma and in code, the same week.",
  },
  {
    slug: "platform-engineer",
    title: "Platform Engineer (SRE)",
    team: "Cloud & DevOps",
    location: "Remote",
    type: "Full-time",
    summary:
      "Terraform, Kubernetes, and pager duty for the systems behind the products.",
  },
  {
    slug: "product-strategist",
    title: "Product Strategist",
    team: "Strategy",
    location: "London / Lahore",
    type: "Full-time",
    summary:
      "Lead discovery engagements. Research, sequence, and pressure-test roadmaps with engineering.",
  },
];

const BENEFITS = [
  { title: "Senior-only", body: "No juniors-on-juniors. You'll be working with people who've shipped at scale." },
  { title: "Flexible hours", body: "Outcomes over presenteeism. Core overlap windows, otherwise — your shape." },
  { title: "Real learning budget", body: "$3K/year for books, conferences, and courses. No approvals." },
  { title: "Equipment", body: "Top-spec laptop, displays, chair. Whatever you need to do your best work." },
  { title: "Time off", body: "30 days plus public holidays. Minimum two consecutive weeks per year." },
  { title: "Health + family", body: "Private health, family leave that doesn't punish anyone, and pension matching." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build with people who"
        highlight="ship for a living."
        description="Codlinx is a senior software studio. Every engagement is led by a partner, every line of code is written by someone who's done it before. If that's your speed, we'd love to meet."
        stats={[
          { value: "40+", label: "On the team" },
          { value: "6", label: "Open roles" },
          { value: "8yr", label: "Avg. experience" },
        ]}
      />

      <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6 border-b border-zinc-900/[0.08] pb-5">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Open roles
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Hiring across every team.
              </h2>
            </div>
            <span className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              {String(ROLES.length).padStart(2, "0")} positions
            </span>
          </div>

          <ul className="mt-8 flex flex-col">
            {ROLES.map((r) => (
              <li key={r.slug}>
                <Link
                  href="/contact"
                  className="group flex items-center justify-between gap-6 border-b border-zinc-900/[0.06] py-6 transition-colors hover:bg-white/60"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
                        style={{
                          backgroundColor: "rgba(63,201,180,0.14)",
                          color: "#1a7a6c",
                        }}
                      >
                        {r.team}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                        {r.location} · {r.type}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                      {r.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
                      {r.summary}
                    </p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-zinc-900 sm:inline-flex">
                    Apply
                    <span
                      className="grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3 text-black"
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
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-zinc-900/[0.06] bg-white p-6 text-sm text-zinc-600 sm:p-8">
            Don&apos;t see your role? We&apos;re always open to senior talent.
            Email{" "}
            <a
              className="font-semibold text-zinc-900 underline-offset-4 hover:underline"
              href="mailto:careers@codlinx.com"
            >
              careers@codlinx.com
            </a>{" "}
            with what you do and what you&apos;d like to do next.
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-black py-20 text-white sm:py-28">
        <div
          aria-hidden
          className="absolute right-[10%] top-1/3 -z-10 h-[400px] w-[400px] rounded-full opacity-[0.10] blur-[120px]"
          style={{ backgroundColor: ACCENT }}
        />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            How we work
          </span>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            The kind of place we&apos;re trying to be.
          </h2>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <li
                key={b.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div
                  className="h-2 w-8 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCTA
        eyebrow="Hiring"
        title="Apply, or just say hello."
        body="If you've shipped something you're proud of, we'd love to hear about it — even if you're not actively looking."
        primary={{ label: "Apply now", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
      />
    </>
  );
}
