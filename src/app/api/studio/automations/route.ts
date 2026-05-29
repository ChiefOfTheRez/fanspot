import { ok } from "@/lib/api";

export async function GET() {
  return ok({ automations: ["Welcome flow", "Renewal reminder", "Weekly post reminder", "Supporter thank-you"] });
}
