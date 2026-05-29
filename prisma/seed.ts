import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const TEST_PASSWORDS = {
  admin: "FanSpotAdmin2026!",
  creator: "FanSpotCreator2026!",
  fan: "FanSpotFan2026!"
};

const testCreators = [
  {
    email: "snowy@fanspot.test",
    username: "snowyskylar",
    displayName: "Snowy Skylar",
    category: "AI Creators",
    headline: "AI persona creator posting polished character sets, launch notes, and fan polls.",
    intro: "Snowy Skylar is a test founding creator account for validating FanSpot creator profiles, tiers, and posts.",
    themePreset: "aurora",
    featuredRank: 1,
    badgeText: "Founding creator"
  },
  {
    email: "luna@fanspot.test",
    username: "lunacosplay",
    displayName: "Luna Vale Cosplay",
    category: "Cosplay",
    headline: "Cosplay previews, convention looks, behind-the-scenes posts, and fan-voted sets.",
    intro: "A temporary cosplay profile for testing discovery, creator pages, memberships, and fan engagement.",
    themePreset: "midnight",
    featuredRank: 2,
    badgeText: "Cosplay creator"
  },
  {
    email: "nova@fanspot.test",
    username: "novadigital",
    displayName: "Nova Digital Art",
    category: "Art",
    headline: "Digital art drops, process shots, downloadable packs, and monthly supporter rewards.",
    intro: "A temporary artist profile for testing store-style creator positioning and category filtering.",
    themePreset: "ember",
    featuredRank: 3,
    badgeText: "Digital artist"
  }
];

async function upsertUser({ email, username, displayName, role, password }: { email: string; username: string; displayName: string; role: "ADMIN" | "CREATOR" | "FAN"; password: string }) {
  const passwordHash = await bcrypt.hash(password, 12);
  return prisma.user.upsert({
    where: { email },
    update: {
      username,
      displayName,
      passwordHash,
      role,
      status: "ACTIVE",
      emailVerified: new Date()
    },
    create: {
      email,
      username,
      displayName,
      passwordHash,
      role,
      status: "ACTIVE",
      emailVerified: new Date()
    }
  });
}

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

  await upsertUser({
    email: "admin@fanspot.test",
    username: "admin",
    displayName: "FanSpot Admin",
    role: "ADMIN",
    password: TEST_PASSWORDS.admin
  });

  await upsertUser({
    email: "fan@fanspot.test",
    username: "fan_test",
    displayName: "Fan Test Account",
    role: "FAN",
    password: TEST_PASSWORDS.fan
  });

  for (const creator of testCreators) {
    const user = await upsertUser({
      email: creator.email,
      username: creator.username,
      displayName: creator.displayName,
      role: "CREATOR",
      password: TEST_PASSWORDS.creator
    });

    const profile = await prisma.creatorProfile.upsert({
      where: { userId: user.id },
      update: {
        headline: creator.headline,
        category: creator.category,
        intro: creator.intro,
        isVerified: true,
        isFoundingCreator: true,
        isAcceptingFans: true,
        profileCompletion: 92,
        themePreset: creator.themePreset,
        featuredRank: creator.featuredRank,
        badgeText: creator.badgeText
      },
      create: {
        userId: user.id,
        headline: creator.headline,
        category: creator.category,
        intro: creator.intro,
        isVerified: true,
        isFoundingCreator: true,
        isAcceptingFans: true,
        profileCompletion: 92,
        themePreset: creator.themePreset,
        featuredRank: creator.featuredRank,
        badgeText: creator.badgeText
      }
    });

    await prisma.creatorTier.deleteMany({ where: { creatorId: profile.id } });
    await prisma.creatorTier.createMany({
      data: [
        { creatorId: profile.id, name: "Free follow", description: "Follow public updates and launch announcements.", priceCents: 0, sortOrder: 0 },
        { creatorId: profile.id, name: "Supporter", description: "Monthly supporter posts, polls, and early previews.", priceCents: 999, sortOrder: 1 },
        { creatorId: profile.id, name: "Core fan", description: "Extra drops, behind-the-scenes notes, and priority updates.", priceCents: 1999, sortOrder: 2 }
      ]
    });

    await prisma.post.deleteMany({ where: { authorId: user.id } });
    await prisma.post.createMany({
      data: [
        {
          authorId: user.id,
          title: "Welcome to my FanSpot test page",
          body: `This is a temporary seeded post for ${creator.displayName}. It helps test the live feed, creator profile, and discovery cards.`,
          visibility: "PUBLIC",
          status: "APPROVED",
          publishedAt: new Date(),
          isPinned: true
        },
        {
          authorId: user.id,
          title: "First supporter drop preview",
          body: "Testing locked/supporter-style content previews before the payment processor is connected.",
          visibility: "FOLLOWERS",
          status: "APPROVED",
          publishedAt: new Date()
        }
      ]
    });
  }

  console.log("FanSpot seed complete.");
  console.log("Admin login: admin@fanspot.test / FanSpotAdmin2026!");
  console.log("Creator login: snowy@fanspot.test / FanSpotCreator2026!");
  console.log("Fan login: fan@fanspot.test / FanSpotFan2026!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
