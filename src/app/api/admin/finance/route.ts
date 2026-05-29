import { ok } from "@/lib/api";
import { calculateCreatorNet } from "@/lib/payout-policy";

export async function GET() {
  return ok({ monthToDate: calculateCreatorNet(1820000), reserveCents: 120000 });
}
