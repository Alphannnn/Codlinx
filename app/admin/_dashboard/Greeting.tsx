"use client";

import { useEffect, useState } from "react";

/**
 * Time-aware greeting. Re-evaluates the salutation on mount based on the
 * client's local time. Date below is live and ticks once a minute.
 */
export default function Greeting({ name }: { name: string }) {
  const [salutation, setSalutation] = useState("Hi");
  const [dateLine, setDateLine] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hour = now.getHours();
      const s =
        hour < 5 ? "Burning the midnight oil"
          : hour < 12 ? "Good morning"
          : hour < 17 ? "Good afternoon"
          : hour < 22 ? "Good evening"
          : "Working late";
      setSalutation(s);
      setDateLine(
        new Intl.DateTimeFormat("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }).format(now)
      );
    };
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  const firstName = name.split(/\s+/)[0] || "there";

  return (
    <div className="flex flex-col gap-5">
      <span
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 backdrop-blur-md"
        style={{ animation: "admin-fade-up 0.6s ease-out both" }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: "#3FC9B4",
            boxShadow: "0 0 6px #3FC9B4",
            animation: "admin-active-pulse 1.4s ease-in-out infinite",
          }}
        />
        {dateLine || "Loading…"}
      </span>
      <h1
        className="text-balance font-semibold leading-[1] tracking-tight"
        style={{
          fontSize: "clamp(40px, 6vw, 64px)",
          letterSpacing: "-0.03em",
          animation: "admin-fade-up 0.7s 0.05s ease-out both",
        }}
      >
        <span
          style={{
            backgroundImage:
              "linear-gradient(120deg, #ffffff 0%, #ffffff 60%, #3FC9B4 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {salutation},
        </span>
        <br />
        <span className="text-white">{firstName}.</span>
      </h1>
      <p
        className="max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
        style={{ animation: "admin-fade-up 0.7s 0.12s ease-out both" }}
      >
        A live read of the studio — bookings, content, and clients.
      </p>
    </div>
  );
}
