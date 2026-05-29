export type LaunchGateStatus = "Ready" | "Draft" | "Needs owner";

export const launchGates: Array<{ title: string; description: string; status: LaunchGateStatus }> = [
  { title: "Core app shell", description: "Landing page, authenticated app shell, feed, discovery, profile, messaging shell, studio, and admin navigation exist.", status: "Ready" },
  { title: "Database plan", description: "Prisma schema covers users, creators, posts, media, subscriptions, reports, payouts, webhooks, settings, and audit logs.", status: "Ready" },
  { title: "AWS architecture", description: "Designed for Amplify or container hosting, RDS PostgreSQL, S3 uploads, CloudFront delivery, and future queue workers.", status: "Ready" },
  { title: "Safety policy", description: "Launch as a compliant general creator platform with report queues, admin review, audit logs, and platform rules.", status: "Ready" },
  { title: "Payment processor", description: "Processor credentials, underwriting, webhook secrets, refund flows, and payout rails must be finalized before paid launch.", status: "Needs owner" },
  { title: "Legal review", description: "Terms, privacy policy, creator agreement, copyright flow, and payment terms need real lawyer review before production.", status: "Needs owner" },
  { title: "Production secrets", description: "DATABASE_URL, NEXTAUTH_SECRET, AWS credentials, upload bucket, CDN URL, and payment webhook secret must be set in AWS.", status: "Draft" },
  { title: "Real auth and writes", description: "The UI and routes are scaffolded; production requires real signup, login, permissions, and database mutations enabled.", status: "Draft" }
];

export function getLaunchReadinessPercent() {
  const ready = launchGates.filter((gate) => gate.status === "Ready").length;
  return Math.round((ready / launchGates.length) * 100);
}
