import { calculateCreatorNet, getPayoutHoldDays } from "@/lib/payout-policy";

export function previewPaymentAllocation(grossCents: number, riskScore = 20) {
  return {
    ...calculateCreatorNet(grossCents),
    holdDays: getPayoutHoldDays(riskScore)
  };
}

export function createWebhookFingerprint(processor: string, id: string) {
  return `${processor}:${id}`;
}
