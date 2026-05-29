import { ok } from "@/lib/api";

export async function GET() {
  return ok({
    status: "healthy",
    app: "FanSpot Launch Ready",
    timestamp: new Date().toISOString()
  });
}
