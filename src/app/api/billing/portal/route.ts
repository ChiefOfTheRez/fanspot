import { ok } from "@/lib/api";

export async function POST() {
  return ok({
    message: "Billing portal request received.",
    portalUrl: "/billing?pendingPortal=open"
  });
}
