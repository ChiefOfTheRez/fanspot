import { getServerSession } from "next-auth";
import { fail, handleApiError, ok } from "@/lib/api";
import { viewerCanAccessPost } from "@/lib/access";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const commentSchema = z.object({ body: z.string().min(1).max(1000) });

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const comments = await prisma.comment.findMany({
    where: { postId: id },
    include: { author: { select: { username: true, displayName: true } } },
    orderBy: { createdAt: "asc" }
  });
  return ok({ postId: id, comments });
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);
    const { id } = await params;

    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { emailVerified: true, status: true } });
    if (!user || user.status !== "ACTIVE") return fail("Account is not active.", 403);
    if (!user.emailVerified) return fail("Verify your email before commenting.", 403);

    const post = await prisma.post.findUnique({ where: { id }, select: { authorId: true, visibility: true, status: true } });
    if (!post || post.status !== "APPROVED") return fail("Post not found", 404);
    const allowed = await viewerCanAccessPost({ viewerId: session.user.id, postId: id, authorId: post.authorId, visibility: post.visibility });
    if (!allowed) return fail("This post is locked for your current access level.", 403);

    const parsed = commentSchema.parse(await request.json());
    const comment = await prisma.comment.create({ data: { postId: id, authorId: session.user.id, body: parsed.body } });
    return ok({ postId: id, comment }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
