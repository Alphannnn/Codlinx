import Link from "next/link";
import PageHero from "../components/PageHero";
import ClosingCTA from "../components/ClosingCTA";

const ACCENT = "#3FC9B4";

export const metadata = {
  title: "Pricing",
  description:
    "Three ways to engage Codlinx — discovery sprints, fixed-scope builds, and embedded retainers. Senior teams, transparent pricing.",
};

const PLANS = [
  {
    name: "Discovery",
    price: "$18K",
    cadence: "fixed fee",
    summary: "Two to four weeks. Sharp problem definition and a shippable plan.",
    bestFor: "Founders and product teams pre-build.",
    features: [
      "Stakeholder + user research (≤ 12 interviews)",
      "Technical audit + risk register",
      "Roadmap with phased scope and budgets",
      "Engineering-validated estimates",
      "Pitch-ready summary deck",
    ],
    cta: { label: "Start with discovery", href: "/contact" },
    accent: false,
  },
  {
    name: "Build",
    price: "From $75K",
    cadence: "fixed scope",
    summary: "Six to sixteen weeks. A senior pod ships your product to production.",
    bestFor: "Teams with a clear scope and a launch deadline.",
    features: [
      "Dedicated 3–6 person pod with a partner lead",
      "Two-week sprints, demos every Friday",
      "Production-grade code, tests, and CI/CD",
      "Design system shipped with the build",
      "30-day post-launch support included",
    ],
    cta: { label: "Get a build quote", href: "/contact" },
    accent: true,
  },
  {
    name: "Embedded",
    price: "From $35K",
    cadence: "per month",
    summary: "Ongoing. A senior squad embedded inside your team.",
    bestFor: "Scale-ups and enterprises with a compounding roadmap.",
    features: [
      "Roadmap, design, and engineering capacity",
      "Quarterly OKRs and reporting",
      "SRE-on-call options for production support",
      "Pause or scale up with 30 days' notice",
      "Direct access to partners and principals",
    ],
    cta: { label: "Talk to a partner", href: "/contact" },
    accent: false,
  },
];

const FAQS = [
  {
    q: "How is a fixed-scope quote produced?",
    a: "We never quote without discovery. A short, paid discovery sprint produces an engineering-validated estimate; the build quote is fixed against that scope.",
  },
  {
    q: "What if scope changes mid-build?",
    a: "We track scope in writing. Small changes are absorbed; substantive changes get a short change-order with a delta to the price. No surprises at invoice time.",
  },
  {
    q: "Do you sign NDAs and DPAs?",
    a: "Yes. We sign mutual NDAs on day one and standard DPAs before any data flows through our systems. SOC 2 / ISO 27001 documentation is available on request.",
  },
  {
    q: "Who owns the IP?",
    a: "You do. On final payment, all source code, designs, and deliverables transfer to you under a perpetual licence.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — with a caveat. We work with funded teams who have a real problem and a willingness to make decisions quickly. We don't do equity-only engagements.",
  },
  {
    q: "What if we already have a team?",
    a: "Embedded engagements are designed for this. We slot senior people into your squads, your tools, and your standups.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Three ways to"
        highlight="work with us."
        description="Senior teams, transparent prices, fixed deliverables. No staff augmentation, no padded hours, no surprise invoices."
      />

      <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PLANS.map((p) => (
              <article
                key={p.name}
                className={[
                  "relative flex flex-col rounded-3xl border p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] sm:p-8",
                  p.accent
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-900/[0.06] bg-white text-zinc-900",
                ].join(" ")}
              >
                {p.accent && (
                  <span
                    className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Most chosen
                  </span>
                )}
                <div
                  className={[
                    "text-[11px] font-semibold uppercase tracking-[0.22em]",
                    p.accent ? "text-white/55" : "text-zinc-500",
                  ].join(" ")}
                >
                  {p.name}
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    {p.price}
                  </span>
                  <span
                    className={[
                      "text-sm font-medium",
                      p.accent ? "text-white/60" : "text-zinc-500",
                    ].join(" ")}
                  >
                    · {p.cadence}
                  </span>
                </div>
                <p
                  className={[
                    "mt-4 text-base leading-relaxed",
                    p.accent ? "text-white/75" : "text-zinc-600",
                  ].join(" ")}
                >
                  {p.summary}
                </p>
                <div
                  className={[
                    "mt-4 text-xs",
                    p.accent ? "text-white/55" : "text-zinc-500",
                  ].join(" ")}
                >
                  Best for: {p.bestFor}
                </div>

                <ul className="mt-7 flex flex-col gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className="mt-[6px] grid h-4 w-4 shrink-0 place-items-center rounded-full"
                        style={{ backgroundColor: "rgba(63,201,180,0.18)" }}
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
                      <span
                        className={[
                          "leading-relaxed",
                          p.accent ? "text-white/85" : "text-zinc-700",
                        ].join(" ")}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={p.cta.href}
                  className={[
                    "mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-transform duration-300 hover:scale-[1.03]",
                    p.accent
                      ? "bg-white text-black"
                      : "bg-zinc-900 text-white",
                  ].join(" ")}
                >
                  {p.cta.label}
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-zinc-900/[0.06] bg-white p-6 text-sm text-zinc-600 sm:p-8">
            All prices in USD, ex-VAT. We invoice monthly in arrears against
            sprint deliverables. Quoted ranges are typical — your exact price
            is fixed during discovery.
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAF7] pb-20 text-zinc-900 sm:pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            FAQ
          </span>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Questions we get asked often.
          </h2>

          <dl className="mt-10 divide-y divide-zinc-200">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group py-5 [&[open]_summary_svg]:rotate-180"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <dt className="text-lg font-semibold tracking-tight">
                    {f.q}
                  </dt>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <dd className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
                  {f.a}
                </dd>
              </details>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCTA
        eyebrow="Ready to start?"
        title="A 30-minute call, no pitch."
        body="We'll listen, ask sharp questions, and tell you whether we're the right fit."
        primary={{ label: "Talk to a partner", href: "/contact" }}
      />
    </>
  );
}
