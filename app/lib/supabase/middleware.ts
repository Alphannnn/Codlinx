import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_CONFIGURED, SUPABASE_URL } from "./config";

/**
 * Refreshes the Supabase session cookie on every request so Server Components
 * see a fresh auth state. Used from the top-level middleware.ts.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });
  // Mirror the pathname header onto the response so it survives streaming.
  response.headers.set("x-pathname", request.nextUrl.pathname);

  if (!SUPABASE_CONFIGURED) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(
          ({ name, value }: { name: string; value: string; options: CookieOptions }) =>
            request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request: { headers: request.headers },
        });
        cookiesToSet.forEach(
          ({ name, value, options }: { name: string; value: string; options: CookieOptions }) =>
            response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Trigger token refresh / cookie write on every request.
  await supabase.auth.getUser();
  return response;
}
