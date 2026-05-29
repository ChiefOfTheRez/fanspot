import { ok } from "@/lib/api";
import { getAdminDashboardSnapshot } from "@/lib/admin";
import { auditLogs, creatorApplications, reports } from "@/lib/mock-data";

export async function GET() {
  return ok({ snapshot: getAdminDashboardSnapshot(), reports, creatorApplications, auditLogs });
}
