import { type NextRequest } from "next/server";
import { updateSession } from "./app/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Expose the request pathname to Server Components via a header so layouts
  // can branch on the current route (e.g. skip the admin auth gate for the
  // /admin/login page itself, avoiding a redirect loop).
  request.headers.set("x-pathname", request.nextUrl.pathname);
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)).*)",
  ],
};
