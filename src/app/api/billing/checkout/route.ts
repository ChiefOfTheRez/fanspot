import { handleApiError, ok } from "@/lib/api";
import { z } from "zod";

const checkoutSchema = z.object({ creatorId: z.string().min(1), tierId: z.string().min(1), returnUrl: z.string().url().optional() });

export async function POST(request: Request) {
  try {
    const parsed = checkoutSchema.parse(await request.json());
    return ok({
      message: "Checkout request received.",
      checkout: parsed,
      checkoutUrl: "/billing?pendingCheckout=pending"
    }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
