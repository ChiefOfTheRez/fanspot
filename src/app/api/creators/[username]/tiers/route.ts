import { fail, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ username: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { username } = await params;
  const creator = await prisma.user.findUnique({ where: { username }, select: { creatorProfile: { select: { id: true } } } });
  if (!creator?.creatorProfile) return fail("Creator not found", 404);
  const tiers = await prisma.creatorTier.findMany({ where: { creatorId: creator.creatorProfile.id, isActive: true }, orderBy: { sortOrder: "asc" } });
  return ok({ username, tiers });
}
