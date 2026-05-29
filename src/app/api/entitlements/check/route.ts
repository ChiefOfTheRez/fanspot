import { ok } from "@/lib/api";
import { canAccess, type Entitlement, type ViewerRelationship } from "@/lib/entitlements";

export async function POST(request: Request) {
  const body = (await request.json()) as { relationship: ViewerRelationship; entitlement: Entitlement };
  return ok({ allowed: canAccess(body.relationship, body.entitlement), relationship: body.relationship, entitlement: body.entitlement });
}
