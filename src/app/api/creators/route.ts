import { ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const creators = await prisma.creatorProfile.findMany({
    orderBy: [{ featuredRank: "asc" }, { createdAt: "desc" }],
    include: {
      user: { select: { id: true, username: true, displayName: true, avatarUrl: true, bio: true } },
      tiers: { where: { isActive: true }, orderBy: { sortOrder: "asc" } }
    }
  });

  return ok({ creators });
}
