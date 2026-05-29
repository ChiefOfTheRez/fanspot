export function creatorApplicationReceivedEmail(displayName: string) {
  return {
    subject: "FanSpot creator application received",
    body: `Hi ${displayName},\n\nWe received your creator application. The founding creator program is intentionally limited, so every application is reviewed manually.\n\nFanSpot Team`
  };
}

export function payoutReviewEmail(displayName: string, amount: string) {
  return {
    subject: "FanSpot payout review update",
    body: `Hi ${displayName},\n\nYour payout batch for ${amount} is in review. You will be notified once it is approved or if more information is needed.\n\nFanSpot Team`
  };
}
