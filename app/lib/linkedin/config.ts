/**
 * LinkedIn integration config. Mirrors the Supabase config pattern: read env,
 * expose a single `LINKEDIN_CONFIGURED` flag, and keep all the LinkedIn-specific
 * constants in one place. Credentials are server-only (no NEXT_PUBLIC_ prefix on
 * the secret) so the client secret never reaches the browser.
 *
 * We post to a LinkedIn *organization* (Company Page), which requires the
 * `w_organization_social` scope plus the read scopes used to discover which
 * organizations the signed-in member can administer.
 */
import { SITE_URL } from "../supabase/config";

export const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID ?? "";
export const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET ?? "";

// LinkedIn's versioned REST APIs require a YYYYMM version header. Override via
// env when LinkedIn rotates the supported window; default tracks a known-good
// version for the Posts + Images APIs.
export const LINKEDIN_API_VERSION = process.env.LINKEDIN_API_VERSION ?? "202405";

// Optional fallback banner used for posts that have no image of their own
// (careers don't carry a cover image). If unset, those post as text-only.
export const LINKEDIN_DEFAULT_IMAGE = process.env.LINKEDIN_DEFAULT_IMAGE ?? "";

// The OAuth redirect must exactly match an "Authorized redirect URL" registered
// on the LinkedIn app (Auth tab). Derived from SITE_URL so it's correct per env.
export const LINKEDIN_REDIRECT_URI = `${SITE_URL.replace(/\/$/, "")}/admin/linkedin/callback`;

// Scopes:
//   w_organization_social  — create posts as an organization
//   r_organization_social  — read an organization's posts (status checks)
//   rw_organization_admin  — list orgs the member administers (ACL lookup)
//   r_organizationsocial / r_basicprofile vary by app; the admin set below is
//   the standard "Community Management API" product grant.
export const LINKEDIN_SCOPES = [
  "w_organization_social",
  "r_organization_social",
  "rw_organization_admin",
];

export const LINKEDIN_CONFIGURED =
  Boolean(LINKEDIN_CLIENT_ID) && Boolean(LINKEDIN_CLIENT_SECRET);

// LinkedIn API hosts.
export const LINKEDIN_OAUTH_BASE = "https://www.linkedin.com/oauth/v2";
export const LINKEDIN_API_BASE = "https://api.linkedin.com";

/**
 * Build the authorization URL the admin is redirected to when connecting.
 * `state` is an opaque CSRF token we verify on the callback.
 */
export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: LINKEDIN_CLIENT_ID,
    redirect_uri: LINKEDIN_REDIRECT_URI,
    state,
    scope: LINKEDIN_SCOPES.join(" "),
  });
  return `${LINKEDIN_OAUTH_BASE}/authorization?${params.toString()}`;
}
