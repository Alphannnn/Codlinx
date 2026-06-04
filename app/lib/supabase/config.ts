/**
 * Central place to detect whether Supabase is configured.
 * If env vars are missing we run in "demo mode" — auth/admin pages still
 * render with seeded data and show a banner inviting the operator to wire
 * Supabase up.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
// Supabase renamed `anon` → `publishable` keys in mid-2025. Accept either env
// var name so old and new project credentials both work.
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";
export const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
export const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase().trim() ??
  "adnan.mustafa@toptal.com";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SUPABASE_CONFIGURED =
  Boolean(SUPABASE_URL) && Boolean(SUPABASE_ANON_KEY);

// Comma-separated list of OAuth providers wired up in the Supabase dashboard.
// Each value must be configured under Authentication → Providers with valid
// client ID + secret. Buttons for un-listed providers are hidden so the login
// page never shows an affordance that won't work.
//   NEXT_PUBLIC_OAUTH_PROVIDERS=google,github
const RAW_OAUTH = process.env.NEXT_PUBLIC_OAUTH_PROVIDERS ?? "";
export const ENABLED_OAUTH_PROVIDERS: ReadonlyArray<"google" | "github"> = RAW_OAUTH
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter((s): s is "google" | "github" => s === "google" || s === "github");

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase().trim() === ADMIN_EMAIL;
}
