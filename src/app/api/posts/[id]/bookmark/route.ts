import { getServerSession } from "next-auth";
import { fail, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return fail("Not authenticated", 401);
  const { id } = await params;

  const existing = await prisma.bookmark.findUnique({ where: { postId_userId: { postId: id, userId: session.user.id } } });
  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return ok({ postId: id, bookmarked: false });
  }

  await prisma.bookmark.create({ data: { postId: id, userId: session.user.id } });
  return ok({ postId: id, bookmarked: true });
}
