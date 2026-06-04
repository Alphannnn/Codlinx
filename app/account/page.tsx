import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/auth";
import { listMeetingsForUser } from "../lib/data";
import { MeetingStatusBadge } from "../components/MeetingStatusBadge";
import { formatFull, relativeDay } from "../lib/formatters";
import { SUPABASE_CONFIGURED } from "../lib/supabase/config";
import Reveal from "../components/Reveal";
import CancelMeetingButton from "./CancelMeetingButton";

const ACCENT = "#3FC9B4";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const meetings = await listMeetingsForUser(user.id);
  const upcoming = meetings.filter(
    (m) => m.status !== "completed" && m.status !== "cancelled" && new Date(m.slot_start).getTime() > Date.now() - 30 * 60_000
  );
  const past = meetings.filter((m) => !upcoming.includes(m));

  return (
    <>
      {!SUPABASE_CONFIGURED && <DemoBanner />}

      <section className="relative isolate overflow-hidden bg-black text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 80% at 50% 30%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 80% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-[-200px] -z-10 h-[460px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-[140px]"
          style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }}
        />

        <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: ACCENT,
                    animation: "codlinx-grid-pulse 1.4s ease-in-out infinite",
                  }}
                />
                Client portal
              </span>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Hello{user.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}.
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/65">
                Your discovery calls, scoped briefs, and partner notes — all in one
                place. Book your next meeting and we&apos;ll confirm within a
                business day.
              </p>
            </div>
            <Link
              href="/account/book"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              Book a meeting
              <span
                className="grid h-7 w-7 place-items-center rounded-full"
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

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-4">
            <StatCard label="Upcoming" value={String(upcoming.length).padStart(2, "0")} />
            <StatCard label="Pending review" value={String(meetings.filter((m) => m.status === "pending").length).padStart(2, "0")} />
            <StatCard label="Completed" value={String(meetings.filter((m) => m.status === "completed").length).padStart(2, "0")} />
            <StatCard label="Total briefs" value={String(meetings.length).padStart(2, "0")} />
          </dl>

          <div className="mt-10 h-px w-full bg-white/[0.06]" />
        </div>
      </section>

      <section className="bg-[#FAFAF7] py-14 text-zinc-900 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Upcoming"
            title="Your booked meetings"
            tail={`${upcoming.length} ${upcoming.length === 1 ? "meeting" : "meetings"}`}
          />

          {upcoming.length === 0 ? (
            <Reveal>
              <EmptyState />
            </Reveal>
          ) : (
            <ul className="mt-8 grid grid-cols-1 gap-4">
              {upcoming.map((m, i) => (
                <Reveal key={m.id} delay={i * 80}>
                  <MeetingCard
                    id={m.id}
                    topic={m.topic}
                    start={m.slot_start}
                    end={m.slot_end}
                    status={m.status}
                    services={m.brief.services ?? []}
                    company={m.brief.company}
                    notes={m.admin_notes}
                  />
                </Reveal>
              ))}
            </ul>
          )}

          {past.length > 0 && (
            <>
              <div className="mt-16">
                <SectionHeader
                  eyebrow="History"
                  title="Past briefs & meetings"
                  tail={`${past.length} ${past.length === 1 ? "record" : "records"}`}
                />
              </div>
              <ul className="mt-8 grid grid-cols-1 gap-4">
                {past.map((m, i) => (
                  <Reveal key={m.id} delay={i * 60}>
                    <MeetingCard
                      id={m.id}
                      topic={m.topic}
                      start={m.slot_start}
                      end={m.slot_end}
                      status={m.status}
                      services={m.brief.services ?? []}
                      company={m.brief.company}
                      notes={m.admin_notes}
                      muted
                    />
                  </Reveal>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/55 px-5 py-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {value}
      </dd>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  tail,
}: {
  eyebrow: string;
  title: string;
  tail?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-900/[0.06] pb-4">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          {eyebrow}
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {tail && (
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
          {tail}
        </span>
      )}
    </div>
  );
}

function MeetingCard({
  id,
  topic,
  start,
  end,
  status,
  services,
  company,
  notes,
  muted = false,
}: {
  id: string;
  topic: string | null;
  start: string;
  end: string;
  status: import("../lib/types").MeetingStatus;
  services: string[];
  company?: string;
  notes: string | null;
  muted?: boolean;
}) {
  return (
    <li
      className={[
        "group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.28)] sm:p-7",
        muted ? "border-zinc-900/[0.04] opacity-90" : "border-zinc-900/[0.06]",
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1 transition-all duration-500 group-hover:w-1.5"
        style={{ backgroundColor: ACCENT }}
      />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <MeetingStatusBadge status={status} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              {relativeDay(start)}
            </span>
          </div>
          <h3 className="mt-3 text-balance text-xl font-semibold tracking-tight">
            {topic || "Discovery call"}
          </h3>
          <p className="mt-1.5 text-sm text-zinc-600">{formatFull(start)} – {new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/London" }).format(new Date(end))}</p>

          {(company || services.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {company && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900/[0.05] px-2.5 py-1 text-xs font-medium text-zinc-700">
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  {company}
                </span>
              )}
              {services.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-zinc-900/[0.08] bg-white px-2.5 py-1 text-xs font-medium text-zinc-600"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {notes && (
            <div className="mt-5 rounded-2xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Partner note
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">
                {notes}
              </p>
            </div>
          )}
        </div>

        {!muted && status !== "cancelled" && status !== "completed" && (
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <CancelMeetingButton id={id} />
          </div>
        )}
      </div>
    </li>
  );
}

function EmptyState() {
  return (
    <div className="mt-8 grid place-items-center rounded-3xl border border-dashed border-zinc-900/10 bg-white py-16 text-center">
      <div
        className="grid h-12 w-12 place-items-center rounded-full"
        style={{ backgroundColor: "rgba(63,201,180,0.10)" }}
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
      </div>
      <p className="mt-4 text-balance text-lg font-semibold tracking-tight">
        No meetings booked yet.
      </p>
      <p className="mt-2 max-w-xs text-sm text-zinc-500">
        Book a 30-minute discovery call with a partner. We come back inside 24
        hours.
      </p>
      <Link
        href="/account/book"
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white"
      >
        Book a meeting
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

function DemoBanner() {
  return (
    <div className="border-b border-amber-500/30 bg-amber-500/[0.08] text-amber-100">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-2.5 text-xs sm:px-8">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-500/30 text-amber-100">
          !
        </span>
        <span className="font-medium">
          Demo mode — Supabase not configured. Bookings persist in memory until
          the server restarts. See{" "}
          <code className="font-mono">.env.local.example</code> to wire a real
          project.
        </span>
      </div>
    </div>
  );
}
