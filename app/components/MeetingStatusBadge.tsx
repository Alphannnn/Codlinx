import type { MeetingStatus } from "../lib/types";

export const STATUS_META: Record<
  MeetingStatus,
  { label: string; dot: string; bg: string; fg: string; ring: string }
> = {
  pending: {
    label: "Awaiting confirmation",
    dot: "#FBBF24",
    bg: "rgba(251, 191, 36, 0.12)",
    fg: "#A15B00",
    ring: "rgba(251, 191, 36, 0.35)",
  },
  confirmed: {
    label: "Confirmed",
    dot: "#3FC9B4",
    bg: "rgba(63, 201, 180, 0.12)",
    fg: "#0B7E6F",
    ring: "rgba(63, 201, 180, 0.4)",
  },
  declined: {
    label: "Declined",
    dot: "#F472B6",
    bg: "rgba(244, 114, 182, 0.12)",
    fg: "#9B1859",
    ring: "rgba(244, 114, 182, 0.4)",
  },
  cancelled: {
    label: "Cancelled",
    dot: "#A1A1AA",
    bg: "rgba(161, 161, 170, 0.12)",
    fg: "#52525B",
    ring: "rgba(161, 161, 170, 0.4)",
  },
  completed: {
    label: "Completed",
    dot: "#6366F1",
    bg: "rgba(99, 102, 241, 0.12)",
    fg: "#3730A3",
    ring: "rgba(99, 102, 241, 0.4)",
  },
};

export function MeetingStatusBadge({
  status,
  variant = "light",
}: {
  status: MeetingStatus;
  variant?: "light" | "dark";
}) {
  const m = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{
        backgroundColor: variant === "dark" ? "rgba(255,255,255,0.04)" : m.bg,
        color: variant === "dark" ? "#fff" : m.fg,
        borderColor: m.ring,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: m.dot,
          boxShadow: `0 0 8px ${m.dot}`,
        }}
      />
      {m.label}
    </span>
  );
}
