import { getServerSession } from "next-auth";
import { handleApiError, fail, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reportCreateSchema } from "@/lib/validators";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") return fail("Admin access required", 403);
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        submitter: { select: { username: true, displayName: true, email: true } },
        post: { select: { id: true, title: true, body: true, author: { select: { username: true, displayName: true } } } }
      },
      take: 100
    });
    return ok({ reports });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);
    const parsed = reportCreateSchema.parse(await request.json());

    const report = await prisma.report.create({
      data: {
        submitterId: session.user.id,
        postId: parsed.postId,
        reason: parsed.reason,
        details: parsed.details
      }
    });

    return ok({ report }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
