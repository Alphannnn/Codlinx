"use client";

import { useMemo, useState, useTransition } from "react";
import {
  removeMeeting,
  setMeetingStatus,
} from "../../lib/actions/meetings";
import type { Meeting, MeetingStatus } from "../../lib/types";
import { formatRange, relativeDay } from "../../lib/formatters";
import { MeetingStatusBadge, STATUS_META } from "../../components/MeetingStatusBadge";

const ACCENT = "#3FC9B4";

const STATUSES: { key: "all" | MeetingStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "declined", label: "Declined" },
];

export default function MeetingsAdminClient({
  initial,
}: {
  initial: Meeting[];
}) {
  const [meetings, setMeetings] = useState(initial);
  const [filter, setFilter] = useState<(typeof STATUSES)[number]["key"]>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: meetings.length };
    for (const m of meetings) c[m.status] = (c[m.status] ?? 0) + 1;
    return c;
  }, [meetings]);

  const filtered = useMemo(() => {
    return meetings.filter((m) => {
      if (filter !== "all" && m.status !== filter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${m.user_email} ${m.user_name ?? ""} ${m.topic ?? ""} ${(m.brief.services ?? []).join(" ")} ${m.brief.company ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [meetings, filter, query]);

  const update = (id: string, status: MeetingStatus, notes?: string) => {
    startTransition(async () => {
      const res = await setMeetingStatus(id, status, notes);
      if (res.ok) {
        setMeetings((curr) =>
          curr.map((x) =>
            x.id === id
              ? { ...x, status, admin_notes: notes ?? x.admin_notes, updated_at: new Date().toISOString() }
              : x
          )
        );
      }
    });
  };

  const remove = (id: string) => {
    startTransition(async () => {
      const res = await removeMeeting(id);
      if (res.ok) setMeetings((curr) => curr.filter((x) => x.id !== id));
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <header
        className="flex flex-col gap-4"
        style={{ animation: "admin-fade-up 0.7s ease-out both" }}
      >
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 backdrop-blur-md">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: ACCENT,
              boxShadow: `0 0 6px ${ACCENT}`,
              animation: "admin-active-pulse 1.4s ease-in-out infinite",
            }}
          />
          Meetings · {meetings.length} total
        </span>
        <h1
          className="text-balance font-semibold leading-[1] tracking-tight"
          style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em" }}
        >
          <span
            style={{
              backgroundImage: "linear-gradient(120deg, #ffffff 0%, #ffffff 55%, #3FC9B4 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Triage every booking.
          </span>
        </h1>
        <p className="max-w-xl text-base text-white/55 sm:text-lg">
          Confirm or decline pending requests, leave a private partner note,
          and keep the queue clean.
        </p>
      </header>

      {/* Filter + Search */}
      <div
        className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        style={{ animation: "admin-fade-up 0.7s 0.08s ease-out both" }}
      >
        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map((s) => {
            const active = filter === s.key;
            const count = counts[s.key] ?? 0;
            const meta = s.key !== "all" ? STATUS_META[s.key as MeetingStatus] : null;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setFilter(s.key)}
                className="group relative inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-xs font-medium transition-all"
                style={{
                  backgroundColor: active
                    ? meta?.dot ? `${meta.dot}1f` : "rgba(255,255,255,0.08)"
                    : "transparent",
                  color: active
                    ? meta?.dot ?? "#fff"
                    : "rgba(255,255,255,0.65)",
                  boxShadow: active
                    ? meta?.dot ? `inset 0 0 0 1px ${meta.dot}55` : "inset 0 0 0 1px rgba(255,255,255,0.18)"
                    : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                {s.key !== "all" && meta && (
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: meta.dot,
                      boxShadow: active ? `0 0 6px ${meta.dot}` : undefined,
                    }}
                  />
                )}
                {s.label}
                <span
                  className="font-mono tabular-nums"
                  style={{
                    color: active ? "inherit" : "rgba(255,255,255,0.4)",
                    fontSize: 10,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative sm:w-72">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search email, topic, company…"
            className="search-input h-9 w-full rounded-full border border-white/[0.06] bg-white/[0.02] pl-9 pr-3 text-sm text-white placeholder:text-white/35 focus:border-white/15 focus:bg-white/[0.04] focus:outline-none"
          />
          <svg
            viewBox="0 0 16 16"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M11 11l3 3" />
          </svg>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-white/45 hover:bg-white/[0.06] hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div
          className="rounded-3xl border border-dashed border-white/[0.06] bg-white/[0.02] px-6 py-16 text-center backdrop-blur-xl"
          style={{ animation: "admin-fade-up 0.6s 0.15s ease-out both" }}
        >
          <div
            className="mx-auto grid h-12 w-12 place-items-center rounded-2xl"
            style={{ backgroundColor: "rgba(63,201,180,0.10)" }}
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5" style={{ color: ACCENT }} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="3.5" width="12" height="11" rx="1.5" />
              <path d="M2 7h12M5 2v3M11 2v3" />
            </svg>
          </div>
          <p className="mt-4 text-base font-semibold tracking-tight">
            {meetings.length === 0 ? "No bookings yet." : "Nothing matches this filter."}
          </p>
          <p className="mt-1 text-sm text-white/55">
            {meetings.length === 0
              ? "When a client books, it'll show up here in real time."
              : "Try changing the status filter or clearing your search."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((m, i) => {
            const isOpen = expanded === m.id;
            const tone = STATUS_META[m.status];
            return (
              <li
                key={m.id}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/[0.12]"
                style={{
                  animation: `admin-fade-up 0.5s ${0.12 + i * 0.04}s ease-out both`,
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-0.5 transition-all duration-500 group-hover:w-1"
                  style={{
                    backgroundColor: tone.dot,
                    boxShadow: `0 0 12px ${tone.dot}`,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : m.id)}
                  className="flex w-full flex-col gap-3 px-5 py-4 pl-6 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pl-7"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
                      <span className="font-mono text-white/60">{relativeDay(m.slot_start)}</span>
                      <span className="text-white/20">·</span>
                      <span>{formatRange(m.slot_start, m.slot_end)}</span>
                    </div>
                    <div className="mt-1.5 truncate text-base font-semibold tracking-tight text-white">
                      {m.topic || "Discovery call"}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-white/55">
                      {m.user_name ? `${m.user_name} · ` : ""}
                      {m.user_email}
                      {m.brief.company ? ` · ${m.brief.company}` : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MeetingStatusBadge status={m.status} variant="dark" />
                    <span
                      className="grid h-7 w-7 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02] transition-colors"
                      style={{ color: isOpen ? tone.dot : "rgba(255,255,255,0.5)" }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M3 6l5 5 5-5" />
                      </svg>
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div
                    className="border-t border-white/[0.06] bg-[#0a0a0e]/40 px-5 py-5 sm:px-6"
                    style={{
                      boxShadow: `inset 0 1px 0 ${tone.ring}`,
                      animation: "admin-expand 0.32s ease-out both",
                    }}
                  >
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                      <Detail label="Services" value={(m.brief.services ?? []).join(" · ") || "—"} />
                      <Detail label="Budget" value={m.brief.budget ?? "—"} />
                      <Detail label="Timeline" value={m.brief.timeline ?? "—"} />
                      <Detail label="Company" value={m.brief.company ?? "—"} />
                      <Detail label="Role" value={m.brief.role ?? "—"} />
                      <Detail label="Booked" value={new Date(m.created_at).toISOString().slice(0, 10)} />
                    </dl>

                    {m.brief.notes && (
                      <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                          Client brief
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                          {m.brief.notes}
                        </p>
                      </div>
                    )}

                    <AdminNotes
                      initial={m.admin_notes ?? ""}
                      onSave={(notes) => update(m.id, m.status, notes)}
                      disabled={pending}
                    />

                    <div className="mt-5 flex flex-wrap gap-2">
                      {m.status !== "confirmed" && (
                        <ActionBtn
                          onClick={() => update(m.id, "confirmed")}
                          disabled={pending}
                          tone="primary"
                          icon={
                            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M3 8l4 4 6-8" />
                            </svg>
                          }
                        >
                          Confirm
                        </ActionBtn>
                      )}
                      {m.status !== "completed" && (
                        <ActionBtn
                          onClick={() => update(m.id, "completed")}
                          disabled={pending}
                          tone="secondary"
                        >
                          Mark completed
                        </ActionBtn>
                      )}
                      {m.status !== "declined" && (
                        <ActionBtn
                          onClick={() => update(m.id, "declined")}
                          disabled={pending}
                          tone="ghost"
                        >
                          Decline
                        </ActionBtn>
                      )}
                      {m.status !== "cancelled" && (
                        <ActionBtn
                          onClick={() => update(m.id, "cancelled")}
                          disabled={pending}
                          tone="ghost"
                        >
                          Cancel
                        </ActionBtn>
                      )}
                      <ActionBtn
                        onClick={() => {
                          if (confirm("Delete this meeting permanently?")) remove(m.id);
                        }}
                        disabled={pending}
                        tone="danger"
                      >
                        Delete
                      </ActionBtn>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <style jsx global>{`
        @keyframes admin-expand {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            max-height: 1200px;
            transform: translateY(0);
          }
        }
        .search-input::-webkit-search-cancel-button {
          display: none;
        }
      `}</style>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium tracking-tight text-white/90">{value}</dd>
    </div>
  );
}

function AdminNotes({
  initial,
  onSave,
  disabled,
}: {
  initial: string;
  onSave: (notes: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(false);
  const dirty = value !== initial;

  return (
    <div className="mt-5">
      <label className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        Partner note (visible to client)
      </label>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        rows={2}
        className="mt-2 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-white/15 focus:bg-white/[0.04] focus:outline-none"
        placeholder="Add a private-to-this-meeting note for the client…"
      />
      <div className="mt-2 flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 text-[11px]"
          style={{
            color: saved
              ? "#3FC9B4"
              : dirty
                ? "#FBBF24"
                : "rgba(255,255,255,0.4)",
          }}
        >
          {saved && (
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8l4 4 6-8" />
            </svg>
          )}
          {dirty && !saved && (
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#FBBF24" }} />
          )}
          {saved ? "Saved" : dirty ? "Unsaved changes" : "Up to date"}
        </span>
        <button
          type="button"
          disabled={disabled || !dirty}
          onClick={() => {
            onSave(value);
            setSaved(true);
          }}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-semibold text-black transition-transform enabled:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save note
        </button>
      </div>
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  disabled,
  tone,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  tone: "primary" | "secondary" | "ghost" | "danger";
  icon?: React.ReactNode;
}) {
  const styles = {
    primary: {
      background: "linear-gradient(120deg, #3FC9B4 0%, #2AA791 100%)",
      color: "#0a0a0e",
      border: "1px solid rgba(63,201,180,0.3)",
      boxShadow: "0 0 0 1px rgba(63,201,180,0.3), 0 8px 24px -12px rgba(63,201,180,0.5)",
    },
    secondary: {
      background: "rgba(255,255,255,0.06)",
      color: "white",
      border: "1px solid rgba(255,255,255,0.12)",
    },
    ghost: {
      background: "transparent",
      color: "rgba(255,255,255,0.7)",
      border: "1px solid rgba(255,255,255,0.08)",
    },
    danger: {
      background: "rgba(244,63,94,0.10)",
      color: "#fb7185",
      border: "1px solid rgba(244,63,94,0.30)",
    },
  }[tone];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-all hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
      style={styles}
    >
      {icon}
      {children}
    </button>
  );
}
