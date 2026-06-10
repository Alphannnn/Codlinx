"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { bookMeeting } from "../../lib/actions/meetings";
import type { Slot } from "../../lib/slot-utils";

const ACCENT = "#3FC9B4";

const SERVICES = [
  "Web app",
  "Mobile app",
  "AI / ML",
  "Cloud / DevOps",
  "UI / UX",
  "Strategy",
];
const BUDGETS = ["< $5K", "$5K–$10K", "$10K–$20K", "$20K+", "Not sure"];
const TIMELINES = ["Yesterday", "1–3 months", "3–6 months", "6+ months"];

type Step = "slot" | "brief" | "review" | "done";

const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
});
const DAY_FMT = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  timeZone: "Europe/London",
});
const FULL_DAY_FMT = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Europe/London",
});

export default function BookingClient({
  user,
  slots,
}: {
  user: { email: string; fullName: string | null };
  slots: Slot[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const presetTopic = params.get("topic") ?? "";

  const [step, setStep] = useState<Step>("slot");
  const [pending, startTransition] = useTransition();

  const [slot, setSlot] = useState<Slot | null>(null);
  const [topic, setTopic] = useState(presetTopic);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [error, setError] = useState<string | null>(null);

  // group days for the picker
  const days = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const s of slots) {
      const key = new Date(s.start).toDateString();
      const arr = map.get(key) ?? [];
      arr.push(s);
      map.set(key, arr);
    }
    return Array.from(map.entries()).map(([key, list]) => ({
      key,
      label: DAY_FMT.format(new Date(key)),
      full: FULL_DAY_FMT.format(new Date(key)),
      slots: list,
    }));
  }, [slots]);

  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const activeDay = days[activeDayIdx];

  const toggleService = (s: string) =>
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const goNext = () => {
    setError(null);
    if (step === "slot") {
      if (!slot) {
        setError("Pick a slot to continue.");
        return;
      }
      setStep("brief");
    } else if (step === "brief") {
      setStep("review");
    }
  };

  const submit = () => {
    if (!slot) return;
    setError(null);
    const fd = new FormData();
    fd.set("slot_start", slot.start);
    fd.set("slot_end", slot.end);
    if (topic) fd.set("topic", topic);
    if (company) fd.set("company", company);
    if (role) fd.set("role", role);
    if (notes) fd.set("notes", notes);
    if (budget) fd.set("budget", budget);
    if (timeline) fd.set("timeline", timeline);
    selectedServices.forEach((s) => fd.append("services", s));

    startTransition(async () => {
      const res = await bookMeeting(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setStep("done");
      setTimeout(() => router.push("/account"), 1800);
    });
  };

  return (
    <section className="relative isolate min-h-[80vh] bg-[#FAFAF7] py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex items-center gap-4">
            <Link
              href="/account"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-zinc-900/10 bg-white px-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 hover:border-zinc-900/30"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3 rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
              Account
            </Link>
            <Stepper step={step} />
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {step === "done"
              ? "You're booked. We'll see you then."
              : "Book a 30-minute discovery call."}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600">
            {step === "slot" && "Pick the slot that works for you — Europe/London time. Times update in real time as others book."}
            {step === "brief" && "A short brief so the partner walks in informed. None of it is required, but the more detail, the sharper the conversation."}
            {step === "review" && "Last look before we put it on the calendar."}
            {step === "done" && "A confirmation email is on its way. You'll see this meeting on your account page."}
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-7 shadow-[0_24px_70px_-32px_rgba(0,0,0,0.18)] sm:p-10">
            {step === "slot" && (
              <SlotPicker
                days={days}
                activeDayIdx={activeDayIdx}
                onPickDay={setActiveDayIdx}
                activeDay={activeDay}
                slot={slot}
                onPickSlot={setSlot}
              />
            )}

            {step === "brief" && (
              <BriefForm
                topic={topic}
                setTopic={setTopic}
                company={company}
                setCompany={setCompany}
                role={role}
                setRole={setRole}
                notes={notes}
                setNotes={setNotes}
                selectedServices={selectedServices}
                toggleService={toggleService}
                budget={budget}
                setBudget={setBudget}
                timeline={timeline}
                setTimeline={setTimeline}
              />
            )}

            {step === "review" && slot && (
              <ReviewBlock
                slot={slot}
                topic={topic}
                company={company}
                role={role}
                notes={notes}
                services={selectedServices}
                budget={budget}
                timeline={timeline}
                user={user}
              />
            )}

            {step === "done" && slot && <DoneBlock slot={slot} />}
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}

          {step !== "done" && (
            <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-zinc-500">
                Signed in as{" "}
                <span className="font-semibold text-zinc-900">{user.email}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {step !== "slot" && (
                  <button
                    type="button"
                    onClick={() => setStep(step === "review" ? "brief" : "slot")}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-5 text-sm font-medium text-zinc-700 hover:border-zinc-900/30"
                  >
                    Back
                  </button>
                )}
                {step === "review" ? (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={pending}
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-transform enabled:hover:scale-[1.03] disabled:opacity-60"
                  >
                    {pending ? "Confirming…" : "Confirm booking"}
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full"
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
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    Continue
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full"
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
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <BookingSummary slot={slot} services={selectedServices} budget={budget} timeline={timeline} topic={topic} />
          <Reassurance />
        </aside>
      </div>
    </section>
  );
}

/* ----------------------- Sub components ----------------------- */

function Stepper({ step }: { step: Step }) {
  const items: { key: Step; label: string }[] = [
    { key: "slot", label: "01 · Slot" },
    { key: "brief", label: "02 · Brief" },
    { key: "review", label: "03 · Confirm" },
  ];
  return (
    <ol className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
      {items.map((it, i) => {
        const order = items.findIndex((x) => x.key === step);
        const active = it.key === step;
        const done = order > i || step === "done";
        return (
          <li
            key={it.key}
            className={[
              "rounded-full px-2.5 py-1",
              active
                ? "bg-zinc-900 text-white"
                : done
                ? "bg-[#3FC9B4]/15 text-[#0B7E6F]"
                : "bg-white text-zinc-500 border border-zinc-900/10",
            ].join(" ")}
          >
            {it.label}
          </li>
        );
      })}
    </ol>
  );
}

function SlotPicker({
  days,
  activeDayIdx,
  onPickDay,
  activeDay,
  slot,
  onPickSlot,
}: {
  days: { key: string; label: string; full: string; slots: Slot[] }[];
  activeDayIdx: number;
  onPickDay: (i: number) => void;
  activeDay?: { key: string; label: string; full: string; slots: Slot[] };
  slot: Slot | null;
  onPickSlot: (s: Slot) => void;
}) {
  if (days.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-900/10 bg-[#FAFAF7] p-10 text-center">
        <p className="text-base font-semibold text-zinc-900">
          No slots available right now.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Email{" "}
          <a
            className="font-semibold text-zinc-900 underline-offset-4 hover:underline"
            href="mailto:info@codlinx.com"
          >
            info@codlinx.com
          </a>{" "}
          and a partner will reach out within the day.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Pick a day
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            All times in Europe/London (GMT+0/+1).
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
          {days.length} days · {days.reduce((a, d) => a + d.slots.length, 0)} slots
        </span>
      </div>

      <ul className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => {
          const isActive = i === activeDayIdx;
          return (
            <li key={d.key}>
              <button
                type="button"
                onClick={() => onPickDay(i)}
                className={[
                  "min-w-[112px] rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                  isActive
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_10px_30px_-14px_rgba(0,0,0,0.4)]"
                    : "border-zinc-900/10 bg-white text-zinc-700 hover:-translate-y-0.5 hover:border-zinc-900/30",
                ].join(" ")}
              >
                <div className={["text-[10px] font-semibold uppercase tracking-[0.22em]", isActive ? "text-white/65" : "text-zinc-500"].join(" ")}>
                  {d.slots.length} slot{d.slots.length === 1 ? "" : "s"}
                </div>
                <div className="mt-1 text-sm font-semibold tracking-tight">
                  {d.label}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {activeDay && (
        <div>
          <div className="flex items-baseline justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {activeDay.full}
            </div>
            <span className="text-[11px] text-zinc-400">
              {activeDay.slots.length} slot{activeDay.slots.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
            {activeDay.slots.map((s) => {
              const active = slot?.start === s.start;
              return (
                <button
                  key={s.start}
                  type="button"
                  onClick={() => onPickSlot(s)}
                  className={[
                    "group/slot relative inline-flex h-12 items-center justify-center gap-1 rounded-xl border text-sm font-medium transition-all duration-200",
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_10px_28px_-14px_rgba(0,0,0,0.4)]"
                      : "border-zinc-900/10 bg-white text-zinc-800 hover:-translate-y-0.5 hover:border-zinc-900/40",
                  ].join(" ")}
                >
                  {active && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                  )}
                  {TIME_FMT.format(new Date(s.start))}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function BriefForm({
  topic,
  setTopic,
  company,
  setCompany,
  role,
  setRole,
  notes,
  setNotes,
  selectedServices,
  toggleService,
  budget,
  setBudget,
  timeline,
  setTimeline,
}: {
  topic: string;
  setTopic: (v: string) => void;
  company: string;
  setCompany: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  selectedServices: string[];
  toggleService: (s: string) => void;
  budget: string;
  setBudget: (v: string) => void;
  timeline: string;
  setTimeline: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Topic
        </span>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          type="text"
          placeholder="What do you want to talk through?"
          className="codlinx-book-input"
        />
      </label>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Company
          </span>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            placeholder="Acme Inc."
            className="codlinx-book-input"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Role
          </span>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            type="text"
            placeholder="Head of Product"
            className="codlinx-book-input"
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Services
          {selectedServices.length > 0 && (
            <span className="ml-2 text-zinc-400 normal-case tracking-normal">
              ({selectedServices.length} selected)
            </span>
          )}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const active = selectedServices.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleService(s)}
                aria-pressed={active}
                className={[
                  "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-900/10 bg-white text-zinc-700 hover:-translate-y-0.5 hover:border-zinc-900/30",
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
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ChipPicker label="Budget" options={BUDGETS} value={budget} onChange={setBudget} />
        <ChipPicker label="Timeline" options={TIMELINES} value={timeline} onChange={setTimeline} />
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Anything we should know?
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Constraints, deadlines, what success looks like in six months — anything."
          className="codlinx-book-input"
        />
      </label>

      <style jsx>{`
        :global(.codlinx-book-input) {
          display: block;
          width: 100%;
          appearance: none;
          background: #ffffff;
          border: 1px solid rgba(24, 24, 27, 0.1);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 15px;
          color: #18181b;
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
        }
        :global(.codlinx-book-input::placeholder) {
          color: #a1a1aa;
        }
        :global(.codlinx-book-input:focus) {
          outline: none;
          border-color: ${ACCENT};
          box-shadow: 0 0 0 4px rgba(63, 201, 180, 0.14);
        }
        :global(textarea.codlinx-book-input) {
          resize: vertical;
          min-height: 120px;
        }
      `}</style>
    </div>
  );
}

function ChipPicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
        {value && (
          <span className="ml-2 text-zinc-400 normal-case tracking-normal">
            · {value}
          </span>
        )}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(active ? "" : o)}
              aria-pressed={active}
              className={[
                "inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-all duration-200",
                active
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-900/10 bg-white text-zinc-700 hover:-translate-y-0.5 hover:border-zinc-900/30",
              ].join(" ")}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ReviewBlock({
  slot,
  topic,
  company,
  role,
  notes,
  services,
  budget,
  timeline,
  user,
}: {
  slot: Slot;
  topic: string;
  company: string;
  role: string;
  notes: string;
  services: string[];
  budget: string;
  timeline: string;
  user: { email: string; fullName: string | null };
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-5">
        <div className="flex items-center gap-3">
          <span
            className="grid h-12 w-12 place-items-center rounded-2xl"
            style={{ backgroundColor: "rgba(63,201,180,0.14)" }}
          >
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5"
              style={{ color: ACCENT }}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3" y="4.5" width="14" height="13" rx="2" />
              <path d="M3 8h14M7 3v3M13 3v3" />
            </svg>
          </span>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Slot
            </div>
            <div className="mt-1 text-base font-semibold tracking-tight text-zinc-900">
              {FULL_DAY_FMT.format(new Date(slot.start))} ·{" "}
              {TIME_FMT.format(new Date(slot.start))}–
              {TIME_FMT.format(new Date(slot.end))}
            </div>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-zinc-900/[0.06] sm:grid-cols-3">
        <ReviewItem label="Name" value={user.fullName ?? "—"} />
        <ReviewItem label="Email" value={user.email} />
        <ReviewItem label="Topic" value={topic || "Discovery"} />
        <ReviewItem label="Company" value={company || "—"} />
        <ReviewItem label="Role" value={role || "—"} />
        <ReviewItem label="Budget" value={budget || "—"} />
        <ReviewItem label="Timeline" value={timeline || "—"} />
        <ReviewItem
          label="Services"
          value={services.length > 0 ? services.join(" · ") : "—"}
        />
      </dl>

      {notes && (
        <div className="rounded-2xl border border-zinc-900/[0.06] bg-white p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Notes
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">{notes}</p>
        </div>
      )}
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-4 py-3">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-semibold text-zinc-900">
        {value}
      </dd>
    </div>
  );
}

function DoneBlock({ slot }: { slot: Slot }) {
  return (
    <div className="flex flex-col items-start gap-5">
      <span
        className="grid h-14 w-14 place-items-center rounded-full"
        style={{ backgroundColor: "rgba(63,201,180,0.14)" }}
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
          Confirmation in motion
        </div>
        <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight">
          Booked for{" "}
          {FULL_DAY_FMT.format(new Date(slot.start))} ·{" "}
          {TIME_FMT.format(new Date(slot.start))}.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-600">
          A confirmation email is on its way. You can see this meeting on your
          account page — feel free to add anything we should know up to 12 hours
          before.
        </p>
      </div>
      <Link
        href="/account"
        className="mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white"
      >
        Go to my account
        <span
          className="grid h-6 w-6 place-items-center rounded-full"
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
      </Link>
    </div>
  );
}

function BookingSummary({
  slot,
  services,
  budget,
  timeline,
  topic,
}: {
  slot: Slot | null;
  services: string[];
  budget: string;
  timeline: string;
  topic: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-900/[0.06] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.2)]">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        Booking summary
      </div>
      <div className="mt-4 flex flex-col gap-3 text-sm">
        <Row label="Date">
          {slot ? FULL_DAY_FMT.format(new Date(slot.start)) : "—"}
        </Row>
        <Row label="Time">
          {slot
            ? `${TIME_FMT.format(new Date(slot.start))}–${TIME_FMT.format(new Date(slot.end))}`
            : "—"}
        </Row>
        <Row label="Topic">{topic || "Discovery"}</Row>
        <Row label="Services">
          {services.length > 0 ? services.join(" · ") : "—"}
        </Row>
        <Row label="Budget">{budget || "—"}</Row>
        <Row label="Timeline">{timeline || "—"}</Row>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </span>
      <span className="text-right text-sm font-medium text-zinc-900">
        {children}
      </span>
    </div>
  );
}

function Reassurance() {
  return (
    <div className="rounded-3xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-6">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        How it goes
      </div>
      <ul className="mt-4 flex flex-col gap-3 text-sm text-zinc-700">
        {[
          "30-minute call with a partner — no pitch.",
          "Confirmation within 24 hours.",
          "If we're not the right fit, we'll tell you who is.",
        ].map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span
              className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
