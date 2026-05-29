import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { handleApiError, ok } from "@/lib/api";
import { getAppUrl, sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/schemas";
import { isStrongEnoughPassword } from "@/lib/security";

function normalizeUsername(username: string) {
  return username.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 24);
}

function shouldAutoVerifyForTest() {
  return process.env.EMAIL_PROVIDER === "console" || process.env.FANSPOT_TEST_MODE === "true";
}

async function createEmailVerification(email: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });
  await prisma.verificationToken.create({ data: { identifier: email, token, expires } });
  const verificationUrl = `${getAppUrl()}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
  await sendEmail({
    to: email,
    subject: "Verify your FanSpot email",
    text: `Welcome to FanSpot. Verify your email here: ${verificationUrl}`,
    html: `<p>Welcome to FanSpot.</p><p><a href="${verificationUrl}">Verify your email</a></p>`
  });
}

export async function POST(request: Request) {
  try {
    const parsed = registerSchema.parse(await request.json());
    const email = parsed.email.toLowerCase().trim();
    const username = normalizeUsername(parsed.username);

    if (!username || username.length < 3) {
      return ok({ accepted: false, reason: "Username must be at least 3 characters and use letters, numbers, or underscores." }, { status: 422 });
    }

    if (!isStrongEnoughPassword(parsed.password)) {
      return ok({ accepted: false, reason: "Password must be at least 10 characters and include uppercase, lowercase, and a number." }, { status: 422 });
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
      select: { email: true, username: true }
    });

    if (existing) {
      return ok(
        {
          accepted: false,
          reason: existing.email === email ? "An account with that email already exists." : "That username is already taken."
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(parsed.password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        displayName: parsed.displayName.trim(),
        passwordHash,
        phoneNumber: parsed.phoneNumber || null,
        emailMarketingOptIn: parsed.emailMarketingOptIn,
        emailVerified: shouldAutoVerifyForTest() ? new Date() : null,
        role: "FAN",
        status: "ACTIVE"
      },
      select: { id: true, email: true, username: true, displayName: true, role: true }
    });

    if (!shouldAutoVerifyForTest()) {
      await createEmailVerification(email);
    }

    return ok({ accepted: true, user, emailVerificationRequired: !shouldAutoVerifyForTest() }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
