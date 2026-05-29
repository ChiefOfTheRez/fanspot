import { ok } from "@/lib/api";
import { getLaunchReadinessPercent, launchGates } from "@/lib/launch-readiness";

export async function GET() {
  return ok({ status: "ok", readiness: getLaunchReadinessPercent(), gates: launchGates });
}
