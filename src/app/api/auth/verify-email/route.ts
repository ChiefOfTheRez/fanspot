import { handleApiError, ok, fail } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, token } = (await request.json()) as { email?: string; token?: string };
    if (!email || !token) return fail("Verification link is missing required information.", 400);

    const normalizedEmail = email.toLowerCase().trim();
    const record = await prisma.verificationToken.findUnique({ where: { token } });
    if (!record || record.identifier !== normalizedEmail || record.expires < new Date()) {
      return fail("This verification link is invalid or expired.", 400);
    }

    await prisma.$transaction([
      prisma.user.update({ where: { email: normalizedEmail }, data: { emailVerified: new Date() } }),
      prisma.verificationToken.delete({ where: { token } })
    ]);

    return ok({ verified: true });
  } catch (error) {
    return handleApiError(error);
  }
}
