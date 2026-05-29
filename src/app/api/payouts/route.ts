import { ok } from "@/lib/api";
import { ledger, payoutRows } from "@/lib/mock-data";

export async function GET() {
  return ok({ ledger, payoutRows, note: "Manual payout data is pending-only until finance workflows are verified." });
}
