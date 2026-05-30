import { getServerSession } from "next-auth";
import type { Prisma } from "@prisma/client";
import { fail, handleApiError, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postCreateSchema } from "@/lib/validators";

export async function GET() {
  // Universal posts: return all approved posts regardless of viewer context.  Any
  // visibility or access rules should be enforced client-side or by specific
  // API endpoints (e.g. comments, likes). By returning all posts here we
  // ensure creators’ posts are visible to fans globally.
  const posts = await prisma.post.findMany({
    where: { status: "APPROVED" },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    include: {
      author: { select: { username: true, displayName: true, avatarUrl: true, role: true } },
      _count: { select: { comments: true, likes: true, bookmarks: true } }
    },
    take: 50
  });
  return ok({ posts });
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);

    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true, emailVerified: true } });
    if (!user) return fail("User not found", 404);
    if (user.role !== "CREATOR" && user.role !== "ADMIN") return fail("Only creator accounts can publish posts.", 403);
    if (!user.emailVerified) return fail("Verify your email before publishing.", 403);

    const parsed = postCreateSchema.parse(await request.json());
    const post = await prisma.post.create({
      data: {
        authorId: session.user.id,
        title: parsed.title,
        body: parsed.body,
        visibility: parsed.visibility,
        status: "APPROVED",
        publishedAt: new Date()
      }
    });

    return ok({ post }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
