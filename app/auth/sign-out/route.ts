import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getServerClient } from "../../lib/supabase/server";
import { SUPABASE_CONFIGURED } from "../../lib/supabase/config";
import { DEMO_USER_COOKIE } from "../../lib/auth";

/**
 * POST-only sign-out. GET is intentionally not exported — letting `<img>`,
 * `<a>`, or arbitrary cross-origin links log a user out is a CSRF vector.
 * We also verify the request originates from this site by comparing the
 * `origin` / `referer` headers against the request host.
 */
export async function POST(request: NextRequest) {
  const host = request.headers.get("host");
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const source = origin ?? referer;
  if (source && host) {
    try {
      const sourceHost = new URL(source).host;
      if (sourceHost !== host) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    } catch {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (supabase) await supabase.auth.signOut();
  } else {
    const store = await cookies();
    store.delete(DEMO_USER_COOKIE);
  }
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
