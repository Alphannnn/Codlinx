/**
 * Server-safe date/time formatters that produce stable strings regardless of
 * locale (always en-GB, Europe/London). Avoids hydration drift.
 */

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Europe/London",
});

const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
});

const FULL_FMT = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
});

export function formatDate(iso: string) {
  return DATE_FMT.format(new Date(iso));
}

export function formatTime(iso: string) {
  return TIME_FMT.format(new Date(iso));
}

export function formatRange(startIso: string, endIso: string) {
  return `${formatDate(startIso)} · ${formatTime(startIso)}–${formatTime(endIso)}`;
}

export function formatFull(iso: string) {
  return FULL_FMT.format(new Date(iso));
}

export function relativeDay(iso: string) {
  const target = new Date(iso);
  const now = new Date();
  const diff = Math.round(
    (target.getTime() -
      new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 1 && diff < 7) return `In ${diff} days`;
  if (diff < -1 && diff > -7) return `${Math.abs(diff)} days ago`;
  return formatDate(iso);
}

const BLOG_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "Europe/London",
});

export function formatBlogDate(iso: string) {
  return BLOG_FMT.format(new Date(iso));
}

export function minutesToHHMM(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
