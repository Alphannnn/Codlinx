import Link from "next/link";
import { getDashboardSnapshot } from "../lib/data";
import { getCurrentUser } from "../lib/auth";
import Greeting from "./_dashboard/Greeting";
import HeroMetric from "./_dashboard/HeroMetric";
import StudioPulse, { type PulseDay } from "./_dashboard/StudioPulse";
import ActivityFeed from "./_dashboard/ActivityFeed";

const ACCENT = "#3FC9B4";
const INDIGO = "#6366F1";
const PINK = "#F472B6";
const EMERALD = "#34D399";
const AMBER = "#FBBF24";

export default async function AdminOverviewPage() {
  const [user, snap] = await Promise.all([
    getCurrentUser(),
    getDashboardSnapshot(),
  ]);

  const bookingsTrend = snap.bookingsLast7Days.map((d) => d.value);
  const totalThisWeek = bookingsTrend.reduce((a, b) => a + b, 0);

  // Convert the 7-day snapshot into the shape StudioPulse expects
  const todayIso = (() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t.toISOString();
  })();
  const pulseDays: PulseDay[] = snap.bookingsLast7Days.map((d) => {
    const date = new Date(d.iso);
    return {
      label: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(date),
      shortDate: new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(date),
      iso: d.iso,
      value: d.value,
      isToday: d.iso === todayIso,
    };
  });

  return (
    <div className="flex flex-col gap-10">
      {/* HERO */}
      <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Greeting name={user?.fullName ?? "studio"} />
        <HeroMetric
          label="This week"
          value={totalThisWeek}
          caption={totalThisWeek === 1 ? "booking" : "bookings"}
          trend={bookingsTrend}
        />
      </section>

      {/* PULSE */}
      <StudioPulse days={pulseDays} />

      {/* ACTIVITY + ACTIONS */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div
          className="overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8"
          style={{ animation: "admin-fade-up 0.7s 0.3s ease-out both" }}
        >
          <header className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: ACCENT,
                    boxShadow: `0 0 6px ${ACCENT}`,
                    animation: "admin-active-pulse 1.4s ease-in-out infinite",
                  }}
                />
                Live activity
              </div>
              <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                Latest from the studio
              </h2>
            </div>
            <Link
              href="/admin/meetings"
              className="group hidden text-xs font-semibold text-white/65 transition-colors hover:text-white sm:inline-flex sm:items-center sm:gap-1.5"
            >
              All bookings
              <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </header>
          <div className="mt-7">
            <ActivityFeed items={snap.activity} />
          </div>
        </div>

        <div
          className="flex flex-col gap-3"
          style={{ animation: "admin-fade-up 0.7s 0.4s ease-out both" }}
        >
          <QuickAction
            href="/admin/blog/new"
            title="New blog post"
            subtitle={`${snap.publishedPosts} published · ${snap.draftPosts} draft`}
            hue={PINK}
            icon={<PlusIcon />}
          />
          <QuickAction
            href="/admin/availability"
            title="Update availability"
            subtitle="Set when discovery calls can be booked"
            hue={INDIGO}
            icon={<ClockIcon />}
          />
          <QuickAction
            href="/admin/careers"
            title="Manage careers"
            subtitle={`${snap.openCareers} open · ${snap.totalCareers} total`}
            hue={EMERALD}
            icon={<TeamIcon />}
          />
          <QuickAction
            href="/admin/meetings"
            title="Triage bookings"
            subtitle={
              snap.meetingsByStatus.pending > 0
                ? `${snap.meetingsByStatus.pending} pending your call`
                : "Inbox zero"
            }
            hue={AMBER}
            icon={<CalIcon />}
            urgent={snap.meetingsByStatus.pending > 0}
          />
        </div>
      </section>
    </div>
  );
}

function QuickAction({
  href,
  title,
  subtitle,
  hue,
  icon,
  urgent,
}: {
  href: string;
  title: string;
  subtitle: string;
  hue: string;
  icon: React.ReactNode;
  urgent?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.05]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${hue} 0%, transparent 70%)` }}
      />
      <span
        className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${hue}1a`, color: hue }}
      >
        {icon}
        {urgent && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: hue,
              boxShadow: `0 0 6px ${hue}`,
              animation: "admin-active-pulse 1.2s ease-in-out infinite",
            }}
          />
        )}
      </span>
      <div className="relative min-w-0 flex-1">
        <div className="truncate text-sm font-semibold tracking-tight text-white">{title}</div>
        <div className="mt-0.5 truncate text-xs text-white/55">{subtitle}</div>
      </div>
      <svg
        viewBox="0 0 16 16"
        className="relative h-3.5 w-3.5 shrink-0 text-white/35 transition-all group-hover:translate-x-0.5 group-hover:text-white"
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
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3l2 1.5" />
    </svg>
  );
}
function TeamIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="6" r="2" />
      <circle cx="11.5" cy="6" r="2" />
      <path d="M2.5 13c.5-1.6 1.9-2.5 3.5-2.5s3 .9 3.5 2.5M11 10.5c1.5 0 2.5.9 3 2.5" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3.5" width="12" height="11" rx="1.5" />
      <path d="M2 7h12M5 2v3M11 2v3" />
    </svg>
  );
}
