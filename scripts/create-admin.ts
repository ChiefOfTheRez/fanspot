import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function normalizeUsername(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 24);
}

async function main() {
  const [, , emailArg, passwordArg, usernameArg] = process.argv;

  if (!emailArg || !passwordArg) {
    console.error("Usage: npm run create:admin -- <email> <password> [username]");
    process.exit(1);
  }

  const email = emailArg.toLowerCase().trim();
  const username = normalizeUsername(usernameArg ?? email.split("@")[0] ?? "admin");
  const passwordHash = await bcrypt.hash(passwordArg, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      username,
      displayName: "FanSpot Team",
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE"
    },
    create: {
      email,
      username,
      displayName: "FanSpot Team",
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE"
    },
    select: { email: true, username: true, role: true }
  });

  await prisma.auditLog.create({
    data: {
      action: "ADMIN_ACCOUNT_CREATED",
      entityType: "User",
      entityId: email,
      metadata: { email: user.email, username: user.username, role: user.role }
    }
  }).catch(() => undefined);

  console.log(`Created admin: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
