import { ok } from "@/lib/api";
import { auditLogs } from "@/lib/mock-data";

export async function GET() {
  return ok({ auditLogs });
}
