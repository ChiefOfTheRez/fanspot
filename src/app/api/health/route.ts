import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "fanspot",
    status: "healthy",
    environment: process.env.APP_ENV ?? process.env.NODE_ENV ?? "unknown",
    timestamp: new Date().toISOString()
  });
}
