import { headers } from "next/headers";
import { fail, ok } from "@/lib/api";

export async function POST(request: Request) {
  const payload = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get("x-segpay-signature");

  if (!process.env.SEGPAY_WEBHOOK_SECRET) {
    return fail("Webhook secret is not configured", 500);
  }

  // TODO: Verify the signature using Segpay's official webhook signing rules.
  // TODO: Store raw payload, event type, processor reference, and ledger entries.
  // TODO: Make this idempotent so repeated webhooks do not duplicate financial records.

  return ok({
    received: true,
    signaturePresent: Boolean(signature),
    payloadBytes: payload.length,
    message: "Segpay webhook section received. Verification and ledger writes still need implementation."
  });
}
