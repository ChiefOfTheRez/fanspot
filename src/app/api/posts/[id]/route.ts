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
  const allowedStatuses = ["PENDING_REVIEW", "APPROVED", "FLAGGED", "REMOVED"] as const;
  const status = session.user.role === "ADMIN" && allowedStatuses.includes(body.status) ? body.status : undefined;
  const post = await prisma.post.update({
    where: { id },
    data: {
      title: typeof body.title === "string" ? body.title : undefined,
      body: typeof body.body === "string" ? body.body : undefined,
      status
    }
  });

  return ok({ post });
}


export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return fail("Not authenticated", 401);

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id }, select: { authorId: true, status: true } });
  if (!existing) return fail("Post not found", 404);
  if (existing.authorId !== session.user.id && session.user.role !== "ADMIN") return fail("Not allowed", 403);

  const post = await prisma.post.update({ where: { id }, data: { status: "REMOVED" } });
  if (session.user.role === "ADMIN" && existing.authorId !== session.user.id) {
    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "POST_REMOVED",
        entityType: "Post",
        entityId: id,
        metadata: { previousStatus: existing.status }
      }
    }).catch(() => null);
  }
  return ok({ postId: id, status: post.status });
}
