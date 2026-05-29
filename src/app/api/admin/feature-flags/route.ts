import { ok } from "@/lib/api";
import { featureFlagRows } from "@/lib/feature-flags";

export async function GET() {
  return ok({ flags: featureFlagRows });
}
