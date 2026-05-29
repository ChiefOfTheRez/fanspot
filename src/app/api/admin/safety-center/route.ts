import { ok } from "@/lib/api";
import { safetyWorkflows } from "@/lib/safety-workflows";

export async function GET() {
  return ok({ workflows: safetyWorkflows });
}
