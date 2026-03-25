import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect investor portal
  if (pathname.startsWith("/investor-access/portal")) {
    const token = request.cookies.get("investor_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/investor-access", request.url));
    }
    const secret = getSecret();
    if (!secret) {
      return NextResponse.redirect(new URL("/investor-access", request.url));
    }
    try {
      await jwtVerify(token, secret);
    } catch {
      const response = NextResponse.redirect(
        new URL("/investor-access", request.url)
      );
      response.cookies.delete("investor_token");
      return response;
    }
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const secret = getSecret();
    if (!secret) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    try {
      const { payload } = await jwtVerify(adminToken, secret);
      if ((payload as Record<string, unknown>).role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/investor-access/portal/:path*", "/admin/:path*"],
};
