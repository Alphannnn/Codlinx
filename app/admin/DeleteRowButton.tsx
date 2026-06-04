"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Result = { ok: true; slug?: string } | { ok: false; error: string };

export default function DeleteRowButton({
  id,
  action,
  label = "Delete?",
}: {
  id: string;
  action: (id: string) => Promise<Result>;
  label?: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 p-1 backdrop-blur-md"
        style={{ animation: "admin-fade-up 0.2s ease-out both" }}
      >
        <span className="px-2 text-[11px] font-medium text-rose-200">{label}</span>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await action(id);
              setConfirming(false);
              router.refresh();
            })
          }
          className="inline-flex h-6 items-center rounded-full bg-rose-500 px-2.5 text-[11px] font-semibold text-white shadow-[0_0_12px_-2px_rgba(244,63,94,0.5)] transition-all hover:bg-rose-400 disabled:opacity-60"
        >
          {pending ? "…" : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="inline-flex h-6 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 text-[11px] font-medium text-white/85 hover:border-white/20"
        >
          No
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label="Delete"
      className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.06] bg-white/[0.02] text-white/55 transition-all hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-300"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 4h10M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 7v5M10 7v5M4 4l1 9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l1-9" />
      </svg>
    </button>
  );
}
