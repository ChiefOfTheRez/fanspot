import { getServerSession } from "next-auth";
import { fail, handleApiError, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { creatorApplicationSchema } from "@/lib/validators";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return fail("Not authenticated", 401);

  const application = await prisma.creatorApplication.findUnique({ where: { userId: session.user.id } });
  return ok({ application });
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);

    const parsed = creatorApplicationSchema.parse(await request.json());
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true, emailVerified: true } });
    if (!user) return fail("User not found", 404);
    if (user.role === "CREATOR" || user.role === "ADMIN") return fail("Creator tools are already enabled for this account.", 409);
    // Test deployment: email delivery may be console-only, so do not block creator applications on email verification.

    const application = await prisma.creatorApplication.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        status: "SUBMITTED",
        submittedAt: new Date(),
        displayName: parsed.displayName,
        desiredUsername: parsed.desiredUsername,
        category: parsed.category,
        audienceSummary: parsed.audienceSummary,
        planSummary: parsed.planSummary
      },
      update: {
        status: "SUBMITTED",
        submittedAt: new Date(),
        displayName: parsed.displayName,
        desiredUsername: parsed.desiredUsername,
        category: parsed.category,
        audienceSummary: parsed.audienceSummary,
        planSummary: parsed.planSummary
      }
    });

    return ok({ application }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
