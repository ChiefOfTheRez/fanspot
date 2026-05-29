export type MetricPoint = { label: string; value: number };

export const creatorGrowthSeries: MetricPoint[] = [
  { label: "Jan", value: 24 },
  { label: "Feb", value: 31 },
  { label: "Mar", value: 44 },
  { label: "Apr", value: 58 },
  { label: "May", value: 73 },
  { label: "Jun", value: 91 }
];

export const adminMetrics = [
  { label: "Open reports", value: "12", trend: "-8%" },
  { label: "Pending applications", value: "7", trend: "+3" },
  { label: "Payouts in review", value: "$4.2k", trend: "Weekly" },
  { label: "System health", value: "99.9%", trend: "Stable" }
];

export function calculateEngagementRate(likes: number, comments: number, impressions: number) {
  if (impressions <= 0) return 0;
  return Number((((likes + comments) / impressions) * 100).toFixed(2));
}
