import { getServerSession } from "next-auth";
import { fail, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return fail("Not authenticated", 401);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      username: true,
      displayName: true,
      role: true,
      status: true,
      avatarUrl: true,
      bio: true,
      createdAt: true
    }
  });

  if (!user) return fail("User not found", 404);
  return ok({ user });
}
