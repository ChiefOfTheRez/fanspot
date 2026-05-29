import { handleApiError, ok } from "@/lib/api";
import { z } from "zod";

const tierSchema = z.object({
  name: z.string().min(2).max(40),
  description: z.string().min(5).max(500),
  priceCents: z.number().int().min(0).max(99900),
  isActive: z.boolean().default(true)
});

export async function GET() {
  return ok({ tiers: [
    { id: "tier_free", name: "Follower", priceCents: 0 },
    { id: "tier_supporter", name: "Supporter", priceCents: 999 }
  ] });
}

export async function POST(request: Request) {
  try {
    const parsed = tierSchema.parse(await request.json());
    return ok({ message: "Tier saved.", tier: parsed }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
