import { ok } from "@/lib/api";
import { canRequestPayout, getPayoutHoldDays } from "@/lib/payout-policy";

export async function GET() {
  const availableCents = 672000;
  return ok({ availableCents, canRequest: canRequestPayout(availableCents), holdDays: getPayoutHoldDays(22) });
}
