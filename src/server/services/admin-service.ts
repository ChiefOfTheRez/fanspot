import { auditLogs, creatorApplications, platformMetrics, payoutRows, reports } from "@/lib/mock-data";

export function getAdminDashboard() {
  return {
    metrics: platformMetrics,
    reports: reports.slice(0, 5),
    applications: creatorApplications.slice(0, 5),
    payouts: payoutRows,
    auditLogs: auditLogs.slice(0, 5)
  };
}
