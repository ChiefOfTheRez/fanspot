export const payoutPolicy = {
  defaultHoldDays: 7,
  highRiskHoldDays: 21,
  minimumPayoutCents: 5000,
  foundingCreatorBoostPercent: 2.5,
  platformFeePercent: 20,
  maxCreatorFeeDiscountPercent: 10
};

export function calculateCreatorNet(grossCents: number, creatorFeePercent = payoutPolicy.platformFeePercent) {
  const platformFee = Math.round(grossCents * (creatorFeePercent / 100));
  const creatorNet = grossCents - platformFee;
  return { grossCents, platformFee, creatorNet };
}

export function getPayoutHoldDays(riskScore: number) {
  return riskScore >= 70 ? payoutPolicy.highRiskHoldDays : payoutPolicy.defaultHoldDays;
}

export function canRequestPayout(availableCents: number) {
  return availableCents >= payoutPolicy.minimumPayoutCents;
}
