import { NextResponse, type NextRequest } from "next/server";

/**
 * Protects /admin with HTTP Basic auth when ADMIN_USER and ADMIN_PASSWORD are
 * set. With no credentials configured the desk stays open, so `npm run dev`
 * works out of the box — set both before you deploy anywhere public.
 */
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) return NextResponse.next();

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const [given, ...rest] = atob(header.slice(6)).split(":");
    if (given === user && rest.join(":") === password) return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Meridian desk"' },
  });
}

export const config = { matcher: ["/admin/:path*"] };
