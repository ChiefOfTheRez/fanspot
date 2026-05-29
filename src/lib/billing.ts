export const platformFees = {
  bronze: { label: "Bronze", split: "80/20", creatorShare: 0.8 },
  silver: { label: "Silver", split: "82.5/17.5", creatorShare: 0.825 },
  platinum: { label: "Platinum", split: "87.5/12.5", creatorShare: 0.875 },
  diamond: { label: "Diamond", split: "90/10", creatorShare: 0.9 }
} as const;

export function calculateCreatorShare(amountCents: number, tier: keyof typeof platformFees = "bronze") {
  const creatorCents = Math.round(amountCents * platformFees[tier].creatorShare);
  return {
    grossCents: amountCents,
    creatorCents,
    platformCents: amountCents - creatorCents,
    split: platformFees[tier].split
  };
}

export function calculateRollingReserve(amountCents: number, reserveRate = 0.1) {
  const reserveCents = Math.round(amountCents * reserveRate);
  return {
    reserveCents,
    availableNowCents: amountCents - reserveCents
  };
}
