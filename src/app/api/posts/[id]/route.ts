import { getServerSession } from "next-auth";
import { fail, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { username: true, displayName: true } }, _count: { select: { comments: true, likes: true, bookmarks: true } } }
  });
  if (!post) return fail("Post not found", 404);
  return ok({ post });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return fail("Not authenticated", 401);

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id }, select: { authorId: true } });
  if (!existing) return fail("Post not found", 404);
  if (existing.authorId !== session.user.id && session.user.role !== "ADMIN") return fail("Not allowed", 403);

  const body = await request.json();
  const post = await prisma.post.update({
    where: { id },
    data: {
      title: typeof body.title === "string" ? body.title : undefined,
      body: typeof body.body === "string" ? body.body : undefined
    }
  });

  return ok({ post });
}
