import { NextResponse, type NextRequest } from "next/server";
import { getServerClient } from "../../lib/supabase/server";
import { SUPABASE_CONFIGURED } from "../../lib/supabase/config";
import { sanitizeNext } from "../../lib/safe-redirect";

/**
 * OAuth + magic-link landing handler.
 *
 *  - Supabase appends `?code=...` for PKCE or magic-link callbacks.
 *  - On the OAuth error path it returns `?error=…&error_description=…` instead.
 *  - The `next` param is sanitized to prevent open-redirect to external hosts.
 *  - On any failure we surface a friendly error on `/login`, never silently
 *    drop the user into `/account`.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const errorParam = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");
  const next = sanitizeNext(url.searchParams.get("next"));

  if (errorParam) {
    const message = errorDescription || errorParam;
    const back = new URL("/login", request.url);
    back.searchParams.set("error", message.slice(0, 200));
    back.searchParams.set("next", next);
    return NextResponse.redirect(back);
  }

  if (SUPABASE_CONFIGURED && code) {
    const supabase = await getServerClient();
    if (!supabase) {
      const back = new URL("/login", request.url);
      back.searchParams.set("error", "Authentication service unavailable.");
      return NextResponse.redirect(back);
    }
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const back = new URL("/login", request.url);
      back.searchParams.set(
        "error",
        "Sign-in link expired or already used. Request a new one."
      );
      back.searchParams.set("next", next);
      return NextResponse.redirect(back);
    }
  } else if (SUPABASE_CONFIGURED && !code) {
    const back = new URL("/login", request.url);
    back.searchParams.set("error", "Sign-in link was incomplete. Request a new one.");
    return NextResponse.redirect(back);
  }

  return NextResponse.redirect(new URL(next, request.url));
}
