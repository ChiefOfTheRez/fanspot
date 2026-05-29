import { getServerSession } from "next-auth";
import { z } from "zod";
import { fail, handleApiError, ok } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const dataImage = z.string().startsWith("data:image/").max(1_500_000).optional().nullable();
const customizationSchema = z.object({
  displayName: z.string().min(2).max(80),
  username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/),
  bio: z.string().max(500).optional().nullable(),
  avatarUrl: z.union([z.string().url(), dataImage]).optional().nullable(),
  bannerUrl: z.union([z.string().url(), dataImage]).optional().nullable(),
  headline: z.string().min(2).max(100),
  category: z.string().min(2).max(60),
  intro: z.string().min(2).max(1200),
  themePreset: z.string().min(2).max(40),
  backgroundUrl: z.union([z.string().url(), dataImage]).optional().nullable(),
  backgroundBlur: z.number().int().min(0).max(32),
  avatarMode: z.enum(["STATIC", "ANIMATED"]),
  bannerMode: z.enum(["STATIC", "ANIMATED"]),
  badgeText: z.string().max(200).optional().nullable(),
  profileAccentColor: z.string().max(20),
  pinnedPostId: z.string().optional().nullable(),
  highlightedTierId: z.string().optional().nullable()
});

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);

    const current = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
    if (!current) return fail("User not found", 404);
    if (current.role !== "CREATOR" && current.role !== "ADMIN") return fail("Creator access required.", 403);

    const parsed = customizationSchema.parse(await request.json());

    const usernameTaken = await prisma.user.findFirst({ where: { username: parsed.username, NOT: { id: session.user.id } }, select: { id: true } });
    if (usernameTaken) return fail("That username is already taken.", 409);

    const existingProfile = await prisma.creatorProfile.findUnique({ where: { userId: session.user.id }, select: { id: true } });
    if (!existingProfile) return fail("Creator profile not found. Apply and get approved first.", 404);

    if (parsed.pinnedPostId) {
      const ownsPost = await prisma.post.findFirst({ where: { id: parsed.pinnedPostId, authorId: session.user.id }, select: { id: true } });
      if (!ownsPost) return fail("Pinned post must be one of your own posts.", 422);
    }

    if (parsed.highlightedTierId) {
      const ownsTier = await prisma.creatorTier.findFirst({ where: { id: parsed.highlightedTierId, creatorId: existingProfile.id }, select: { id: true } });
      if (!ownsTier) return fail("Highlighted tier must be one of your own tiers.", 422);
    }

    const [user, creatorProfile] = await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          displayName: parsed.displayName,
          username: parsed.username,
          bio: parsed.bio || null,
          avatarUrl: parsed.avatarUrl || null,
          bannerUrl: parsed.bannerUrl || null
        },
        select: { id: true, username: true, displayName: true }
      }),
      prisma.creatorProfile.update({
        where: { userId: session.user.id },
        data: {
          headline: parsed.headline,
          category: parsed.category,
          intro: parsed.intro,
          themePreset: parsed.themePreset,
          backgroundUrl: parsed.backgroundUrl || null,
          backgroundBlur: parsed.backgroundBlur,
          avatarMode: parsed.avatarMode,
          bannerMode: parsed.bannerMode,
          badgeText: parsed.badgeText || null,
          profileAccentColor: parsed.profileAccentColor,
          pinnedPostId: parsed.pinnedPostId || null,
          highlightedTierId: parsed.highlightedTierId || null,
          profileCompletion: 85
        }
      })
    ]);

    return ok({ user, creatorProfile });
  } catch (error) {
    return handleApiError(error);
  }
}
