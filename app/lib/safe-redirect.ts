/**
 * Sanitize a `?next=` query-string value so it can only redirect within our
 * own origin. Blocks protocol-relative URLs (`//evil`), backslash tricks, and
 * path-traversal segments.
 */
export function sanitizeNext(raw: string | null | undefined, fallback = "/account"): string {
  if (!raw) return fallback;
  if (!raw.startsWith("/")) return fallback;
  if (raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  if (raw.includes("..")) return fallback;
  return raw;
}
