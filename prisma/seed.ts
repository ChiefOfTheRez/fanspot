import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.featureFlag.upsert({
    where: { key: "PUBLIC_SIGNUPS" },
    update: { enabled: true },
    create: {
      key: "PUBLIC_SIGNUPS",
      enabled: true,
      description: "Allow new users to create accounts from the signup page."
    }
  });

  console.log("FanSpot seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
