"use client";

import { useMemo, useState, useTransition } from "react";
import {
  deleteAvailabilityRow,
  saveAvailability,
} from "../../lib/actions/availability";
import type { AvailabilityWindow } from "../../lib/types";
import { minutesToHHMM } from "../../lib/formatters";

const ACCENT = "#3FC9B4";
const DAYS = [
  { label: "Mon", full: "Monday", idx: 1 },
  { label: "Tue", full: "Tuesday", idx: 2 },
  { label: "Wed", full: "Wednesday", idx: 3 },
  { label: "Thu", full: "Thursday", idx: 4 },
  { label: "Fri", full: "Friday", idx: 5 },
  { label: "Sat", full: "Saturday", idx: 6 },
  { label: "Sun", full: "Sunday", idx: 0 },
];

type Preset = { label: string; start: number; end: number; slot: number };
const PRESETS: Preset[] = [
  { label: "Workday · 09:00–18:00 · 30 min", start: 9 * 60, end: 18 * 60, slot: 30 },
  { label: "Mornings · 09:00–13:00 · 30 min", start: 9 * 60, end: 13 * 60, slot: 30 },
  { label: "Afternoons · 14:00–18:00 · 30 min", start: 14 * 60, end: 18 * 60, slot: 30 },
  { label: "Evening · 18:00–21:00 · 30 min", start: 18 * 60, end: 21 * 60, slot: 30 },
];

export default function AvailabilityAdminClient({
  initial,
}: {
  initial: AvailabilityWindow[];
}) {
  const [windows, setWindows] = useState(initial);
  const [pending, startTransition] = useTransition();

  const [day, setDay] = useState(1);
  const [startH, setStartH] = useState("09");
  const [startM, setStartM] = useState("00");
  const [endH, setEndH] = useState("18");
  const [endM, setEndM] = useState("00");
  const [slotLen, setSlotLen] = useState(30);
  const [error, setError] = useState<string | null>(null);
  const [recentId, setRecentId] = useState<string | null>(null);

  const totalSlots = useMemo(() => {
    return windows.reduce((acc, w) => {
      return acc + Math.max(0, Math.floor((w.end_minute - w.start_minute) / w.slot_length_min));
    }, 0);
  }, [windows]);

  const activeDays = useMemo(() => {
    const s = new Set(windows.map((w) => w.day_of_week));
    return s.size;
  }, [windows]);

  const add = () => {
    setError(null);
    const startMin = Number(startH) * 60 + Number(startM);
    const endMin = Number(endH) * 60 + Number(endM);
    if (endMin <= startMin) {
      setError("End time must be after start time.");
      return;
    }
    const fd = new FormData();
    fd.set("day_of_week", String(day));
    fd.set("start_minute", String(startMin));
    fd.set("end_minute", String(endMin));
    fd.set("slot_length_min", String(slotLen));
    startTransition(async () => {
      const res = await saveAvailability(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      const newId = `tmp_${Math.random().toString(36).slice(2, 8)}`;
      setWindows((curr) => [
        ...curr,
        {
          id: newId,
          day_of_week: day,
          start_minute: startMin,
          end_minute: endMin,
          slot_length_min: slotLen,
          is_active: true,
        },
      ]);
      setRecentId(newId);
      setTimeout(() => setRecentId(null), 2000);
    });
  };

  const applyPreset = (p: Preset) => {
    setStartH(String(Math.floor(p.start / 60)).padStart(2, "0"));
    setStartM(String(p.start % 60).padStart(2, "0"));
    setEndH(String(Math.floor(p.end / 60)).padStart(2, "0"));
    setEndM(String(p.end % 60).padStart(2, "0"));
    setSlotLen(p.slot);
  };

  const remove = (id: string) => {
    startTransition(async () => {
      await deleteAvailabilityRow(id);
      setWindows((curr) => curr.filter((w) => w.id !== id));
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
          Availability
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
            When can clients book?
          </span>
        </h1>
        <p className="max-w-xl text-base text-white/55 sm:text-lg">
          Set weekly windows. Clients only see slots that fit inside these
          windows and aren&apos;t already booked.
        </p>

        {/* Mini stats */}
        <div className="mt-2 flex flex-wrap gap-2">
          <Stat label="Active days" value={`${activeDays} of 7`} hue={ACCENT} />
          <Stat label="Bookable slots / week" value={String(totalSlots)} hue="#6366F1" />
          <Stat label="Windows defined" value={String(windows.length)} hue="#F472B6" />
        </div>
      </header>

      {/* Composer */}
      <section
        className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl sm:p-6"
        style={{ animation: "admin-fade-up 0.7s 0.08s ease-out both" }}
      >
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
          <svg viewBox="0 0 16 16" className="h-3 w-3" style={{ color: ACCENT }} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M8 3v10M3 8h10" />
          </svg>
          Add a window
        </div>

        {/* Quick presets */}
        <div className="mt-4 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p)}
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 text-[11px] font-medium text-white/75 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" style={{ color: ACCENT }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8l4 4 6-8" />
              </svg>
              {p.label}
            </button>
          ))}
        </div>

        {/* Day picker */}
        <div className="mt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            Day
          </span>
          <div className="mt-2 grid grid-cols-7 gap-1.5 sm:max-w-md">
            {DAYS.map((d) => {
              const active = day === d.idx;
              return (
                <button
                  key={d.idx}
                  type="button"
                  onClick={() => setDay(d.idx)}
                  aria-pressed={active}
                  className="inline-flex h-10 items-center justify-center rounded-lg text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: active ? `${ACCENT}1f` : "rgba(255,255,255,0.02)",
                    color: active ? ACCENT : "rgba(255,255,255,0.65)",
                    boxShadow: active
                      ? `inset 0 0 0 1px ${ACCENT}55, 0 0 12px ${ACCENT}33`
                      : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time + slot length */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[2fr_2fr_1.2fr]">
          <Field label="Start">
            <div className="flex items-center gap-2">
              <DarkSelect
                value={startH}
                onChange={setStartH}
                options={Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))}
              />
              <span className="font-mono text-white/40">:</span>
              <DarkSelect value={startM} onChange={setStartM} options={["00", "15", "30", "45"]} />
            </div>
          </Field>
          <Field label="End">
            <div className="flex items-center gap-2">
              <DarkSelect
                value={endH}
                onChange={setEndH}
                options={Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))}
              />
              <span className="font-mono text-white/40">:</span>
              <DarkSelect value={endM} onChange={setEndM} options={["00", "15", "30", "45"]} />
            </div>
          </Field>
          <Field label="Slot length (min)">
            <DarkSelect
              value={String(slotLen)}
              onChange={(v) => setSlotLen(Number(v))}
              options={["15", "20", "30", "45", "60"]}
            />
          </Field>
        </div>

        {error && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            {error}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          <Preview
            day={DAYS.find((d) => d.idx === day)?.full ?? "Day"}
            startH={startH}
            startM={startM}
            endH={endH}
            endM={endM}
            slotLen={slotLen}
          />
          <button
            type="button"
            onClick={add}
            disabled={pending}
            className="group inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: "linear-gradient(120deg, #3FC9B4 0%, #2AA791 100%)",
              color: "#0a0a0e",
              boxShadow: "0 0 0 1px rgba(63,201,180,0.3), 0 8px 24px -12px rgba(63,201,180,0.5)",
            }}
          >
            {pending ? "Saving…" : "Add window"}
            <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </section>

      {/* Weekly grid */}
      <section
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(7,minmax(0,1fr))]"
        style={{ animation: "admin-fade-up 0.7s 0.16s ease-out both" }}
      >
        {DAYS.map((d, i) => {
          const dayWindows = windows
            .filter((w) => w.day_of_week === d.idx)
            .sort((a, b) => a.start_minute - b.start_minute);
          const isWeekend = d.idx === 0 || d.idx === 6;
          return (
            <article
              key={d.idx}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/[0.12]"
              style={{ animation: `admin-fade-up 0.55s ${0.2 + i * 0.04}s ease-out both` }}
            >
              <header className="flex items-center justify-between gap-2 border-b border-white/[0.05] px-4 py-3">
                <div className="flex flex-col leading-tight">
                  <span
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: isWeekend ? "rgba(255,255,255,0.45)" : "white" }}
                  >
                    {d.label}
                  </span>
                  <span className="text-[10px] text-white/40">{d.full}</span>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold tabular-nums"
                  style={{
                    backgroundColor: dayWindows.length ? `${ACCENT}1a` : "rgba(255,255,255,0.04)",
                    color: dayWindows.length ? ACCENT : "rgba(255,255,255,0.4)",
                  }}
                >
                  {dayWindows.length}
                </span>
              </header>

              {dayWindows.length === 0 ? (
                <div className="px-4 py-6 text-center">
                  <div
                    className="mx-auto grid h-8 w-8 place-items-center rounded-lg border border-dashed border-white/[0.08]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M8 3v10M3 8h10" />
                    </svg>
                  </div>
                  <p className="mt-2 text-[11px] text-white/40">Closed</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-2 p-3">
                  {dayWindows.map((w) => {
                    const slotCount = Math.max(
                      0,
                      Math.floor((w.end_minute - w.start_minute) / w.slot_length_min)
                    );
                    const isNew = recentId === w.id;
                    return (
                      <li
                        key={w.id}
                        className="group/row relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all hover:border-white/[0.18]"
                        style={{
                          animation: isNew
                            ? "admin-window-in 0.5s ease-out both, admin-window-flash 1.5s 0.4s ease-out both"
                            : undefined,
                        }}
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 left-0 w-0.5"
                          style={{
                            backgroundColor: ACCENT,
                            boxShadow: `0 0 8px ${ACCENT}`,
                          }}
                        />
                        <div className="flex items-center justify-between gap-2 pl-2">
                          <div>
                            <div className="font-mono text-sm font-semibold tabular-nums text-white">
                              {minutesToHHMM(w.start_minute)}
                              <span className="mx-1.5 text-white/30">→</span>
                              {minutesToHHMM(w.end_minute)}
                            </div>
                            <div className="mt-0.5 text-[10px] text-white/45">
                              {slotCount} × {w.slot_length_min}-min slots
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(w.id)}
                            disabled={pending}
                            aria-label="Remove window"
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/45 opacity-0 transition-all hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-300 group-hover/row:opacity-100 disabled:opacity-30"
                          >
                            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M3 4h10M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 7v5M10 7v5M4 4l1 9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l1-9" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </article>
          );
        })}
      </section>

      <style jsx global>{`
        @keyframes admin-window-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes admin-window-flash {
          0%   { box-shadow: 0 0 0 0 rgba(63,201,180,0.45), inset 0 0 0 1px rgba(63,201,180,0.45); }
          100% { box-shadow: 0 0 0 6px rgba(63,201,180,0),   inset 0 0 0 1px rgba(63,201,180,0); }
        }
      `}</style>
    </div>
  );
}

function Stat({ label, value, hue }: { label: string; value: string; hue: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 backdrop-blur-md">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: hue, boxShadow: `0 0 6px ${hue}` }}
      />
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      <span className="font-mono text-xs font-semibold tabular-nums text-white">{value}</span>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      {children}
    </label>
  );
}

function DarkSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative flex-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 pr-8 font-mono text-sm tabular-nums text-white focus:border-white/20 focus:bg-white/[0.04] focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0a0a0e] text-white">
            {o}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-white/45"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 6l5 5 5-5" />
      </svg>
    </div>
  );
}

function Preview({
  day,
  startH,
  startM,
  endH,
  endM,
  slotLen,
}: {
  day: string;
  startH: string;
  startM: string;
  endH: string;
  endM: string;
  slotLen: number;
}) {
  const startMin = Number(startH) * 60 + Number(startM);
  const endMin = Number(endH) * 60 + Number(endM);
  const dur = endMin - startMin;
  const slots = dur > 0 && slotLen > 0 ? Math.floor(dur / slotLen) : 0;
  const valid = dur > 0;
  return (
    <div className="flex min-w-0 items-center gap-2 text-xs text-white/55">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: valid ? ACCENT : "rgba(255,255,255,0.2)",
          boxShadow: valid ? `0 0 6px ${ACCENT}` : undefined,
        }}
      />
      <span className="truncate">
        {day} · <span className="font-mono text-white/85">{startH}:{startM}</span>
        <span className="mx-1 text-white/30">→</span>
        <span className="font-mono text-white/85">{endH}:{endM}</span>
        {valid && (
          <span className="ml-2 text-white/45">
            ({slots} × {slotLen}-min slot{slots === 1 ? "" : "s"})
          </span>
        )}
      </span>
    </div>
  );
}
