"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import PageHero from "../components/PageHero";

const ACCENT = "#3FC9B4";

const BUDGETS = ["< $5K", "$25K–$75K", "$75K–$200K", "$200K+", "Not sure"];
const SERVICES = [
  "Web app",
  "Mobile app",
  "AI / ML",
  "Cloud / DevOps",
  "UI / UX",
  "Strategy",
];
const TIMELINES = ["1–2 weeks", "1–3 months", "3–6 months", "6+ months"];
const MAX_BRIEF = 1500;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [brief, setBrief] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [consent, setConsent] = useState(false);

  const toggleService = (s: string) =>
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const progress = useMemo(() => {
    let filled = 0;
    if (name.trim()) filled++;
    if (email.trim()) filled++;
    if (brief.trim().length > 20) filled++;
    if (selectedServices.length > 0) filled++;
    if (budget) filled++;
    if (timeline) filled++;
    return Math.round((filled / 6) * 100);
  }, [name, email, brief, selectedServices, budget, timeline]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent || status === "sending") return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  };

  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Tell us what you're"
        highlight="building."
        description="A 30-minute call. No pitch. We'll listen, ask sharp questions, and come back inside 24 hours with a scoped plan, a team, and a price."
      />

      <section className="bg-[#FAFAF7] py-16 text-zinc-900 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_340px] lg:gap-14">
          <div>
            {status === "sent" ? (
              <SuccessCard
                name={name}
                services={selectedServices}
                budget={budget}
                timeline={timeline}
              />
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white shadow-[0_28px_80px_-40px_rgba(0,0,0,0.22)]"
              >
                <ProgressBar value={progress} />

                <div className="p-7 sm:p-10">
                  <Step number="01" title="About you">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FloatField
                        label="Full name"
                        required
                        value={name}
                        onChange={setName}
                        autoComplete="name"
                        type="text"
                      />
                      <FloatField
                        label="Work email"
                        required
                        value={email}
                        onChange={setEmail}
                        autoComplete="email"
                        type="email"
                      />
                      <FloatField
                        label="Company"
                        value={company}
                        onChange={setCompany}
                        autoComplete="organization"
                        type="text"
                      />
                      <FloatField
                        label="Role"
                        value={role}
                        onChange={setRole}
                        autoComplete="organization-title"
                        type="text"
                      />
                    </div>
                  </Step>

                  <Divider />

                  <Step number="02" title="About the project">
                    <ChipGroup
                      legend="What do you need?"
                      hint="Select any that apply"
                      options={SERVICES}
                      value={selectedServices}
                      onChange={setSelectedServices}
                      multi
                      onToggle={toggleService}
                    />

                    <div className="mt-7">
                      <FloatTextarea
                        label="The brief"
                        required
                        value={brief}
                        onChange={setBrief}
                        max={MAX_BRIEF}
                        placeholder="What are you building, who's it for, and what does success look like in six months?"
                      />
                    </div>
                  </Step>

                  <Divider />

                  <Step number="03" title="Scope & timing">
                    <ChipGroup
                      legend="Budget"
                      options={BUDGETS}
                      single
                      value={budget ? [budget] : []}
                      onChange={(v) => setBudget(v[0] ?? "")}
                      onToggle={(v) => setBudget((b) => (b === v ? "" : v))}
                    />
                    <div className="mt-6">
                      <ChipGroup
                        legend="Timeline"
                        options={TIMELINES}
                        single
                        value={timeline ? [timeline] : []}
                        onChange={(v) => setTimeline(v[0] ?? "")}
                        onToggle={(v) => setTimeline((t) => (t === v ? "" : v))}
                      />
                    </div>
                  </Step>

                  <Divider />

                  <label className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
                      <input
                        type="checkbox"
                        required
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-zinc-300 bg-white transition-colors checked:border-zinc-900 checked:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                        style={{
                          ["--tw-ring-color" as string]: `${ACCENT}66`,
                        }}
                      />
                      <svg
                        viewBox="0 0 16 16"
                        className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M3 8l4 4 6-8" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">
                      I agree to Codlinx&apos;s{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-zinc-900 underline-offset-4 hover:underline"
                      >
                        privacy policy
                      </Link>{" "}
                      and consent to being contacted about my enquiry.
                    </span>
                  </label>

                  <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-zinc-500">
                      Prefer email? Write to{" "}
                      <a
                        className="font-semibold text-zinc-900 underline-offset-4 hover:underline"
                        href="mailto:info@codlinx.com"
                      >
                        info@codlinx.com
                      </a>
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending" || !consent}
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-all duration-300 enabled:hover:scale-[1.03] enabled:hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === "sending" ? (
                        <>
                          <Spinner />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send brief
                          <span
                            className="grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
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
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            <SideCard
              eyebrow="Email"
              title="info@codlinx.com"
              body="For projects, press, or partnerships."
              href="mailto:info@codlinx.com"
              icon={<MailIcon />}
            />
            <SideCard
              eyebrow="Studios"
              title="London · Lahore · Remote"
              body="Senior team across UK and APAC time zones."
              icon={<GlobeIcon />}
            />
            <SideCard
              eyebrow="Office"
              title="Parramatta, Sydney"
              body="7 Parramatta Square, Level 40, 10 Darcy Street, Parramatta, NSW, 2150"
              href="https://maps.google.com/?q=7+Parramatta+Square,+Level+40,+10+Darcy+Street,+Parramatta+NSW+2150"
              icon={<PinIcon />}
            />
            <SideCard
              eyebrow="Response time"
              title="Inside 24 hours"
              body="Weekdays. Every brief is read by a partner."
              icon={<ClockIcon />}
            />
            <SideCard
              eyebrow="Careers"
              title="We're hiring"
              body="Engineers, designers, and product leads."
              href="/careers"
              icon={<TeamIcon />}
            />

            <div className="mt-2 rounded-2xl border border-zinc-900/[0.06] bg-white p-5">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                </span>
                Now booking · Q3
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-zinc-600">
                Two new engagements opening in July. Discovery slots fill first.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <style jsx global>{`
        .codlinx-float-wrap {
          position: relative;
        }
        .codlinx-float-input {
          width: 100%;
          appearance: none;
          background: #ffffff;
          border: 1px solid rgba(24, 24, 27, 0.10);
          border-radius: 12px;
          padding: 22px 14px 10px 14px;
          font-size: 15px;
          color: #18181b;
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
        }
        .codlinx-float-input::placeholder {
          color: transparent;
        }
        .codlinx-float-input:focus {
          outline: none;
          border-color: ${ACCENT};
          box-shadow: 0 0 0 4px rgba(63, 201, 180, 0.14);
          background-color: #fff;
        }
        textarea.codlinx-float-input {
          resize: vertical;
          min-height: 140px;
          padding-top: 26px;
        }
        .codlinx-float-label {
          position: absolute;
          left: 14px;
          top: 14px;
          font-size: 14px;
          color: #71717a;
          pointer-events: none;
          transform-origin: left top;
          transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), color 0.18s;
          background: transparent;
          padding: 0 2px;
        }
        .codlinx-float-input:focus + .codlinx-float-label,
        .codlinx-float-input:not(:placeholder-shown) + .codlinx-float-label {
          transform: translateY(-9px) scale(0.78);
          color: #52525b;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .codlinx-float-input:focus + .codlinx-float-label {
          color: ${ACCENT};
        }
      `}</style>
    </>
  );
}

/* -------------------------- Building blocks -------------------------- */

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="relative h-1 w-full bg-zinc-900/[0.05]"
      aria-hidden
    >
      <div
        className="absolute inset-y-0 left-0 rounded-r-full transition-all duration-500"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, ${ACCENT}, #7FF0DC)`,
          boxShadow: `0 0 12px ${ACCENT}88`,
        }}
      />
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col">
      <div className="flex items-baseline gap-3">
        <span
          className="font-mono text-[11px] font-semibold tracking-[0.22em] text-zinc-400"
          aria-hidden
        >
          {number}
        </span>
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.22em] text-zinc-900">
          {title}
        </h3>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Divider() {
  return <div className="my-8 h-px w-full bg-zinc-900/[0.06]" />;
}

function FloatField({
  label,
  type = "text",
  required = false,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  const id = `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className="codlinx-float-wrap">
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="codlinx-float-input peer"
      />
      <label htmlFor={id} className="codlinx-float-label">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
    </div>
  );
}

function FloatTextarea({
  label,
  required = false,
  value,
  onChange,
  max,
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  max: number;
  placeholder?: string;
}) {
  const id = `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const isFull = value.length >= max;
  const isNear = value.length >= max * 0.85;
  return (
    <div>
      <div className="codlinx-float-wrap">
        <textarea
          id={id}
          required={required}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, max))}
          placeholder=" "
          className="codlinx-float-input"
          maxLength={max}
        />
        <label htmlFor={id} className="codlinx-float-label">
          {label}
          {required && <span className="ml-0.5 text-rose-500">*</span>}
        </label>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-zinc-500">
          {placeholder ?? "Tell us about the project."}
        </span>
        <span
          className={[
            "font-mono tabular-nums transition-colors",
            isFull
              ? "text-rose-500"
              : isNear
              ? "text-amber-600"
              : "text-zinc-400",
          ].join(" ")}
          aria-live="polite"
        >
          {value.length}/{max}
        </span>
      </div>
    </div>
  );
}

function ChipGroup({
  legend,
  hint,
  options,
  value,
  onToggle,
  multi = false,
  single = false,
}: {
  legend: string;
  hint?: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  onToggle: (v: string) => void;
  multi?: boolean;
  single?: boolean;
}) {
  return (
    <fieldset>
      <div className="flex items-baseline justify-between gap-3">
        <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          {legend}
          {multi && (
            <span className="ml-2 font-normal normal-case tracking-normal text-zinc-400">
              {value.length > 0 ? `(${value.length} selected)` : "(any)"}
            </span>
          )}
          {single && value.length > 0 && (
            <span className="ml-2 font-normal normal-case tracking-normal text-zinc-400">
              · {value[0]}
            </span>
          )}
        </legend>
        {hint && (
          <span className="text-[11px] text-zinc-400">{hint}</span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(opt)}
              className={[
                "group/chip inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-all duration-200",
                active
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_8px_20px_-12px_rgba(0,0,0,0.4)]"
                  : "border-zinc-900/10 bg-white text-zinc-700 hover:-translate-y-[1px] hover:border-zinc-900/30",
              ].join(" ")}
            >
              {active && (
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3"
                  style={{ color: ACCENT }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 8l4 4 6-8" />
                </svg>
              )}
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="8" cy="8" r="6" opacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" />
    </svg>
  );
}

function SuccessCard({
  name,
  services,
  budget,
  timeline,
}: {
  name: string;
  services: string[];
  budget: string;
  timeline: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-8 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.22)] sm:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-[0.10] blur-3xl"
        style={{ backgroundColor: ACCENT }}
      />
      <div className="flex flex-col items-start gap-6">
        <span
          className="grid h-14 w-14 place-items-center rounded-full"
          style={{ backgroundColor: "rgba(63,201,180,0.12)" }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            style={{ color: ACCENT }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12.5l5 5 11-11" />
          </svg>
        </span>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Brief received
          </div>
          <h2 className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Thanks{name ? `, ${name.split(" ")[0]}` : ""}. We&apos;ll be in touch.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600">
            A partner will read your brief today and email you within 24 hours
            with a sequenced plan and a price. If it&apos;s urgent, write
            directly to{" "}
            <a
              className="font-semibold text-zinc-900 underline-offset-4 hover:underline"
              href="mailto:info@codlinx.com"
            >
              info@codlinx.com
            </a>
            .
          </p>
        </div>

        {(services.length > 0 || budget || timeline) && (
          <dl className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-zinc-900/[0.06] sm:grid-cols-3">
            <SummaryItem
              label="Services"
              value={services.length > 0 ? services.join(" · ") : "—"}
            />
            <SummaryItem label="Budget" value={budget || "—"} />
            <SummaryItem label="Timeline" value={timeline || "—"} />
          </dl>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            Back to home
          </Link>
          <Link
            href="/work"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-5 text-sm font-medium text-zinc-700 hover:border-zinc-900/30"
          >
            See our work
          </Link>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-5 py-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-semibold text-zinc-900">
        {value}
      </dd>
    </div>
  );
}

function SideCard({
  eyebrow,
  title,
  body,
  href,
  icon,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  icon?: ReactNode;
}) {
  const inner = (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-white p-5 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/15 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.22)]">
      <div className="flex items-start gap-4">
        {icon && (
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:rotate-[-4deg]"
            style={{ backgroundColor: "rgba(63,201,180,0.12)", color: ACCENT }}
          >
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {eyebrow}
          </div>
          <div className="mt-1 truncate text-[15px] font-semibold tracking-tight text-zinc-900">
            {title}
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-600">{body}</p>
        </div>
        {href && (
          <svg
            viewBox="0 0 16 16"
            className="mt-1 h-3.5 w-3.5 text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-zinc-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        )}
      </div>
    </div>
  );
  return href ? (
    href.startsWith("mailto:") ? (
      <a href={href}>{inner}</a>
    ) : (
      <Link href={href}>{inner}</Link>
    )
  ) : (
    inner
  );
}

/* Inline icons (currentColor) */
function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 6l7 5 7-5" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.5 10h15M10 2.5c2.5 3 2.5 12 0 15M10 2.5c-2.5 3-2.5 12 0 15" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.5V10l3 2" />
    </svg>
  );
}
function TeamIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="7" cy="8" r="2.5" />
      <circle cx="14" cy="8" r="2.5" />
      <path d="M2.5 16c.7-2 2.4-3 4.5-3s3.8 1 4.5 3M14 13c1.7 0 3.1 1 3.5 3" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 17.5c3.5-3.5 5.5-6.3 5.5-9a5.5 5.5 0 1 0-11 0c0 2.7 2 5.5 5.5 9z" />
      <circle cx="10" cy="8.5" r="2" />
    </svg>
  );
}
