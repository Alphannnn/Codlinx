"use client";

import { useEffect } from "react";

const ACCENT = "#3FC9B4";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.error("[codlinx:global-error]", error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.25rem 0.75rem",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 999,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Critical error
          </span>
          <h1
            style={{
              marginTop: 24,
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              background: `linear-gradient(120deg, #ffffff 0%, ${ACCENT} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Something went wrong.
          </h1>
          <p
            style={{
              marginTop: 18,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.6,
              fontSize: 16,
            }}
          >
            We&apos;ve logged the issue. Refresh the page, or come back in a moment.
          </p>
          {error?.digest && (
            <p
              style={{
                marginTop: 12,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Ref: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 28,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              height: 48,
              padding: "0 1.5rem",
              borderRadius: 999,
              border: 0,
              background: "#fff",
              color: "#000",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
