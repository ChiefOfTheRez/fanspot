import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { adminRoutes, creatorRoutes, protectedRoutes } from "@/lib/routes";

const PUBLIC_FILE = /\.(.*)$/;

function matchesPath(path: string, routes: string[]) {
  return routes.some((route) => path === route || path.startsWith(`${route}/`));
}

function unauthorized(request: NextRequest, reason: string, status = 401) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: reason }, { status });
  }

  const url = request.nextUrl.clone();
  url.pathname = status === 403 ? "/feed" : "/login";
  url.searchParams.set(status === 403 ? "notice" : "next", status === 403 ? reason : request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    path.startsWith("/_next") ||
    path.startsWith("/favicon") ||
    path.startsWith("/api/auth") ||
    path === "/api/health" ||
    path === "/api/status" ||
    path === "/verify-email" ||
    PUBLIC_FILE.test(path)
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (matchesPath(path, protectedRoutes) && !token) {
    return unauthorized(request, "Please log in first.");
  }

  if (matchesPath(path, adminRoutes) && token?.role !== "ADMIN") {
    return unauthorized(request, "Admin access required.", 403);
  }

  if (matchesPath(path, creatorRoutes) && token?.role !== "CREATOR" && token?.role !== "ADMIN") {
    return unauthorized(request, "Creator access required.", 403);
  }

  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-FanSpot-Route-Class", matchesPath(path, adminRoutes) ? "admin" : matchesPath(path, creatorRoutes) ? "creator" : matchesPath(path, protectedRoutes) ? "protected" : "public");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
