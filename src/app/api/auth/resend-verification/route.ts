import crypto from "node:crypto";
import { getServerSession } from "next-auth";
import { fail, handleApiError, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getAppUrl, sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);

    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { email: true, emailVerified: true } });
    if (!user) return fail("User not found", 404);
    if (user.emailVerified) return ok({ sent: false, reason: "Email already verified." });

    if (process.env.EMAIL_PROVIDER === "console" || process.env.FANSPOT_TEST_MODE === "true") {
      await prisma.user.update({ where: { id: session.user.id }, data: { emailVerified: new Date() } });
      return ok({ sent: false, verified: true, reason: "Email verified automatically for the test environment." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    await prisma.verificationToken.deleteMany({ where: { identifier: user.email } });
    await prisma.verificationToken.create({ data: { identifier: user.email, token, expires } });

    const verificationUrl = `${getAppUrl()}/verify-email?token=${token}&email=${encodeURIComponent(user.email)}`;
    await sendEmail({
      to: user.email,
      subject: "Verify your FanSpot email",
      text: `Verify your FanSpot email here: ${verificationUrl}`,
      html: `<p><a href="${verificationUrl}">Verify your FanSpot email</a></p>`
    });

    return ok({ sent: true });
  } catch (error) {
    return handleApiError(error);
  }
}
