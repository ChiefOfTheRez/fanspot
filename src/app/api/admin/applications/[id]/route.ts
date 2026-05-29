import { getServerSession } from "next-auth";
import { handleApiError, ok, fail } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({ status: z.enum(["NEEDS_MORE_INFO", "APPROVED", "REJECTED"]), notes: z.string().max(2000).optional() });

type RouteProps = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params;
  const application = await prisma.creatorApplication.findUnique({ where: { id }, include: { user: true } });
  return ok({ application });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") return fail("Admin access required", 403);
    const { id } = await params;
    const parsed = reviewSchema.parse(await request.json());

    const application = await prisma.creatorApplication.findUnique({ where: { id }, include: { user: true } });
    if (!application) return fail("Application not found", 404);

    const updated = await prisma.$transaction(async (tx) => {
      const app = await tx.creatorApplication.update({
        where: { id },
        data: { status: parsed.status, reviewNotes: parsed.notes, reviewedById: session.user.id, reviewedAt: new Date() }
      });

      if (parsed.status === "APPROVED") {
        await tx.user.update({ where: { id: application.userId }, data: { role: "CREATOR" } });
        const profile = await tx.creatorProfile.upsert({
          where: { userId: application.userId },
          create: {
            userId: application.userId,
            headline: `${application.category} creator`,
            category: application.category,
            intro: application.planSummary,
            isAcceptingFans: true,
            profileCompletion: 45,
            badgeText: "Approved Creator"
          },
          update: {
            headline: `${application.category} creator`,
            category: application.category,
            intro: application.planSummary,
            badgeText: "Approved Creator"
          }
        });

        const existingTiers = await tx.creatorTier.count({ where: { creatorId: profile.id } });
        if (existingTiers === 0) {
          await tx.creatorTier.createMany({
            data: [
              { creatorId: profile.id, name: "Follower", description: "Public posts and community updates.", priceCents: 0, sortOrder: 0 },
              { creatorId: profile.id, name: "Supporter", description: "Supporter posts and creator updates.", priceCents: 999, sortOrder: 1 }
            ]
          });
        }
      }

      await tx.auditLog.create({ data: { actorId: session.user.id, action: `CREATOR_APPLICATION_${parsed.status}`, entityType: "CreatorApplication", entityId: id, metadata: { notes: parsed.notes } } });
      return app;
    });

    return ok({ application: updated });
  } catch (error) {
    return handleApiError(error);
  }
}
