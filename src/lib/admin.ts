import { auditLogs, creatorApplications, reports } from "@/lib/mock-data";

export function getAdminDashboardSnapshot() {
  return {
    reportsOpen: reports.filter((item) => item.status !== "Resolved").length,
    highPriorityReports: reports.filter((item) => item.priority === "High").length,
    applicationsPending: creatorApplications.filter((item) => item.status === "Submitted" || item.status === "Needs info").length,
    criticalAuditEvents: auditLogs.filter((item) => item.severity === "Critical").length
  };
}

export function nextReviewAction(status: string) {
  if (status === "Open") return "Assign moderator";
  if (status === "In review") return "Request evidence";
  if (status === "Resolved") return "Archive";
  return "Review";
}
