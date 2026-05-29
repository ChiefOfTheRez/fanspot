import { ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const creators = q
    ? await prisma.creatorProfile.findMany({
        where: { OR: [{ user: { displayName: { contains: q } } }, { user: { username: { contains: q } } }, { category: { contains: q } }, { headline: { contains: q } }] },
        include: { user: { select: { username: true, displayName: true, avatarUrl: true } } },
        take: 20
      })
    : [];
  return ok({ q, creators, posts: [] });
}
