import { getServerSession } from "next-auth";
import { fail, handleApiError, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { calculateCreatorShare } from "@/lib/billing";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const subscriptionIntentSchema = z.object({ creatorId: z.string().min(1), tierId: z.string().min(1), amountCents: z.number().int().positive() });

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return fail("Not authenticated", 401);

  const subscriptions = await prisma.subscription.findMany({
    where: { fanId: session.user.id },
    include: { creator: { select: { username: true, displayName: true } }, tier: true },
    orderBy: { startedAt: "desc" }
  });

  return ok({ subscriptions });
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);
    const parsed = subscriptionIntentSchema.parse(await request.json());
    return ok({ message: "Subscription checkout is not enabled yet.", intent: parsed, split: calculateCreatorShare(parsed.amountCents) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
