export const platformTiers = [
  { name: "Bronze", creatorSplit: "80%", requirements: "Approved creator profile and safety agreement." },
  { name: "Silver", creatorSplit: "82.5%", requirements: "Founding creator or consistent activity milestone." },
  { name: "Platinum", creatorSplit: "87.5%", requirements: "Strong retention, low dispute rate, high-quality community record." },
  { name: "Diamond", creatorSplit: "90%", requirements: "Top creator status with excellent compliance and performance." }
];

export function getCreatorSplitPercent(tier: string) {
  switch (tier.toLowerCase()) {
    case "diamond": return 90;
    case "platinum": return 87.5;
    case "silver": return 82.5;
    default: return 80;
  }
}
