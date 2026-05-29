export const awsServices = [
  { service: "Amplify or ECS", purpose: "Host the Next.js app and server routes." },
  { service: "RDS PostgreSQL", purpose: "Primary relational database for users, posts, subscriptions, reports, and payouts." },
  { service: "S3", purpose: "Private origin storage for uploaded media assets." },
  { service: "CloudFront", purpose: "Global CDN layer in front of app and media delivery." },
  { service: "Secrets Manager", purpose: "Payment, auth, database, and AWS credentials." },
  { service: "CloudWatch", purpose: "Logs, alerts, metrics, and operational dashboards." }
];

export function estimateMonthlyBaseCostLabel(stage: "local" | "mvp" | "growth") {
  if (stage === "local") return "Near-zero except local dev tools";
  if (stage === "mvp") return "Keep infrastructure small and monitor usage weekly";
  return "Move to reserved capacity, queue workers, and stronger observability";
}
