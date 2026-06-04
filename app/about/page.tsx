import Link from "next/link";
import PageHero from "../components/PageHero";
import ClosingCTA from "../components/ClosingCTA";

const ACCENT = "#3FC9B4";

export const metadata = {
  title: "About",
  description:
    "A senior software studio that designs, engineers, and ships under one roof. London, Lahore, and remote.",
};

const VALUES = [
  {
    title: "Senior or nothing",
    body: "We hire engineers and designers with 8+ years in. No staff augmentation, no juniors-on-juniors.",
  },
  {
    title: "Ship every week",
    body: "Two-week sprints, demos every Friday, software in production from week one — not a slide deck.",
  },
  {
    title: "One team, no handoffs",
    body: "Design and engineering sit in the same room. The brief, the code, and the rollout share a Slack thread.",
  },
  {
    title: "Outcomes, not hours",
    body: "We agree on the number we're moving before we start. Then we move it.",
  },
];

const TEAM = [
  { name: "Sara Khan", role: "Managing Partner · Strategy", initials: "SK" },
  { name: "Daniel Reyes", role: "Partner · Engineering", initials: "DR" },
  { name: "Amani Osei", role: "Partner · Design", initials: "AO" },
  { name: "Raza Ahmed", role: "Director · AI", initials: "RA" },
  { name: "Lia Chen", role: "Director · Mobile", initials: "LC" },
  { name: "Noor Siddiqui", role: "Director · Cloud", initials: "NS" },
  { name: "Maya Patel", role: "Principal Engineer", initials: "MP" },
  { name: "Felix Berg", role: "Principal Designer", initials: "FB" },
];

const TIMELINE = [
  {
    year: "2019",
    title: "Codlinx is founded",
    body: "Two engineers and a designer set up shop in London. First client ships in 11 weeks.",
  },
  {
    year: "2021",
    title: "Lahore studio opens",
    body: "A senior engineering hub spins up across timezones. Headcount crosses 20.",
  },
  {
    year: "2023",
    title: "AI practice launches",
    body: "Dedicated team for LLMs, RAG, and ML systems. First seven-figure AI engagement signs.",
  },
  {
    year: "2025",
    title: "120th product shipped",
    body: "120+ products across 12 industries. 4.9/5 client rating across engagements.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Codlinx"
        title="A senior studio,"
        highlight="under one roof."
        description="Codlinx is a 40-strong design + engineering studio. We work shoulder-to-shoulder with founders and Fortune 500 teams to ship software that moves a number."
        stats={[
          { value: "2019", label: "Founded" },
          { value: "40+", label: "Engineers & designers" },
          { value: "120+", label: "Products shipped" },
          { value: "4.9/5", label: "Client rating" },
        ]}
      />

      <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                What we believe
              </span>
              <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                Four principles that show up in every engagement.
              </h2>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="rounded-2xl border border-zinc-900/[0.06] bg-white p-7 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.15)] sm:p-9"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-600">
                  {v.body}
                </p>
              </div>
            ))}
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
            Team
          </span>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            Senior people, all the way down.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Every engagement is led by a partner. Every line of code is written
            by someone who&apos;s shipped at scale.
          </p>

          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {TEAM.map((m) => (
              <li
                key={m.name}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl text-sm font-bold text-black"
                  style={{ backgroundColor: ACCENT }}
                >
                  {m.initials}
                </div>
                <div className="mt-4 text-sm font-semibold text-white">
                  {m.name}
                </div>
                <div className="mt-1 text-xs text-white/55">{m.role}</div>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
            >
              We&apos;re hiring — see open roles
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
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
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            Story
          </span>
          <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            How we got here.
          </h2>

          <ol className="relative mt-12 flex flex-col gap-10 border-l-2 border-zinc-200 pl-8">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative">
                <span
                  className="absolute -left-[42px] grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {t.year.slice(2)}
                </span>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {t.year}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {t.title}
                </h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-zinc-600">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCTA
        eyebrow="Work with us"
        title="Have something worth shipping?"
        body="Tell us about your project. We come back inside 24 hours with a plan, a team, and a price."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
      />
    </>
  );
}
