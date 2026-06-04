import type { AvailabilityWindow, BlockedSlot, Meeting } from "./types";

export type Slot = { start: string; end: string };

/**
 * Generate the next `days` of available 30-min (or whatever the window says)
 * slots, filtered by blocked slots and existing bookings.
 */
export function generateSlots({
  availability,
  blocked,
  meetings,
  days = 14,
  from = new Date(),
  bufferMin = 60,
}: {
  availability: AvailabilityWindow[];
  blocked: BlockedSlot[];
  meetings: Meeting[];
  days?: number;
  from?: Date;
  bufferMin?: number;
}): Slot[] {
  const out: Slot[] = [];
  const earliest = new Date(from.getTime() + bufferMin * 60_000);

  // Active windows keyed by day-of-week
  const byDay = new Map<number, AvailabilityWindow[]>();
  for (const w of availability) {
    if (!w.is_active) continue;
    const arr = byDay.get(w.day_of_week) ?? [];
    arr.push(w);
    byDay.set(w.day_of_week, arr);
  }

  const blockedRanges = blocked.map((b) => ({
    start: new Date(b.starts_at).getTime(),
    end: new Date(b.ends_at).getTime(),
  }));
  const bookedRanges = meetings
    .filter((m) => m.status === "pending" || m.status === "confirmed")
    .map((m) => ({
      start: new Date(m.slot_start).getTime(),
      end: new Date(m.slot_end).getTime(),
    }));

  for (let d = 0; d < days; d++) {
    const day = new Date(from);
    day.setDate(day.getDate() + d);
    day.setHours(0, 0, 0, 0);
    const dow = day.getDay();
    const windows = byDay.get(dow);
    if (!windows) continue;
    for (const w of windows) {
      let cursor = w.start_minute;
      while (cursor + w.slot_length_min <= w.end_minute) {
        const start = new Date(day);
        start.setMinutes(cursor);
        const end = new Date(start.getTime() + w.slot_length_min * 60_000);
        cursor += w.slot_length_min;
        if (start.getTime() < earliest.getTime()) continue;
        const s = start.getTime();
        const e = end.getTime();
        if (blockedRanges.some((r) => overlap(s, e, r.start, r.end))) continue;
        if (bookedRanges.some((r) => overlap(s, e, r.start, r.end))) continue;
        out.push({ start: start.toISOString(), end: end.toISOString() });
      }
    }
  }
  return out.sort((a, b) => (a.start < b.start ? -1 : 1));
}

function overlap(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd;
}

export function groupSlotsByDay(slots: Slot[]): Record<string, Slot[]> {
  const out: Record<string, Slot[]> = {};
  for (const s of slots) {
    const key = s.start.slice(0, 10); // YYYY-MM-DD (UTC) — fine for grouping
    out[key] = out[key] ?? [];
    out[key].push(s);
  }
  return out;
}
