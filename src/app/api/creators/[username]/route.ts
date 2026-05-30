import { fail, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ username: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { username } = await params;
  const creator = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
      bannerUrl: true,
      creatorProfile: { include: { tiers: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } } }
    }
  });
  if (!creator?.creatorProfile) return fail("Creator not found", 404);
  // Return all approved posts from this creator (universal visibility). The client
  // should handle access control for followers/supporters as needed.
  const posts = await prisma.post.findMany({ where: { authorId: creator.id, status: "APPROVED" }, orderBy: { createdAt: "desc" }, take: 20 });
  return ok({ creator, posts });
}
