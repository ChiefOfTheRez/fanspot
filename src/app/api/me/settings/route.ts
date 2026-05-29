import { getServerSession } from "next-auth";
import { z } from "zod";
import { fail, handleApiError, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const settingsSchema = z.object({
  displayName: z.string().min(2).max(80),
  username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/),
  bio: z.string().max(500).optional().nullable(),
  phoneNumber: z.string().trim().max(30).optional().nullable().transform((value) => value || null),
  emailMarketingOptIn: z.boolean()
});

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);
    const parsed = settingsSchema.parse(await request.json());
    const usernameTaken = await prisma.user.findFirst({ where: { username: parsed.username, NOT: { id: session.user.id } }, select: { id: true } });
    if (usernameTaken) return fail("That username is already taken.", 409);
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        displayName: parsed.displayName,
        username: parsed.username,
        bio: parsed.bio || null,
        phoneNumber: parsed.phoneNumber,
        emailMarketingOptIn: parsed.emailMarketingOptIn
      },
      select: { id: true, displayName: true, username: true, phoneNumber: true, bio: true, emailMarketingOptIn: true }
    });
    return ok({ user });
  } catch (error) {
    return handleApiError(error);
  }
}
