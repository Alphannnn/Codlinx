"use client";

import { useState, useTransition } from "react";
import { setMeetingStatus } from "../lib/actions/meetings";

export default function CancelMeetingButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  return confirming ? (
    <div className="flex flex-col gap-2 rounded-2xl border border-zinc-900/[0.08] bg-[#FAFAF7] p-3 text-sm">
      <span className="text-xs font-medium text-zinc-600">
        Cancel this meeting?
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await setMeetingStatus(id, "cancelled");
              setConfirming(false);
            })
          }
          className="inline-flex h-9 items-center rounded-full bg-zinc-900 px-3 text-xs font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Cancelling…" : "Yes, cancel"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="inline-flex h-9 items-center rounded-full border border-zinc-900/10 bg-white px-3 text-xs font-medium text-zinc-700"
        >
          Keep
        </button>
      </div>
    </div>
  ) : (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-zinc-900/10 bg-white px-3 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-900/30 hover:text-zinc-900"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
      Cancel meeting
    </button>
  );
}
