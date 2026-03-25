import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the investor portal — require investor_token cookie
  if (pathname.startsWith("/investor-access/portal")) {
    const token = request.cookies.get("investor_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/investor-access", request.url));
    }
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/investor-access/portal/:path*", "/admin/:path*"],
};
