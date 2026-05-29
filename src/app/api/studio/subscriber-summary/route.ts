import { ok } from "@/lib/api";

export async function GET() {
  return ok({ active: 428, atRisk: 19, newThisMonth: 42, topTier: "Silver" });
}
