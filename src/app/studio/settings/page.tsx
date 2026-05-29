import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { StudioNav } from "@/components/StudioNav";
import { StudioSettingsForm } from "@/components/StudioSettingsForm";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StudioSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?next=/studio/settings");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      creatorProfile: { include: { tiers: { orderBy: { sortOrder: "asc" } } } },
      posts: { orderBy: { createdAt: "desc" }, select: { id: true, title: true, body: true }, take: 50 }
    }
  });
  if (!user || (user.role !== "CREATOR" && user.role !== "ADMIN")) redirect("/creator/apply");
  if (!user.creatorProfile) redirect("/creator/apply");

  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Creator Studio" title="Profile customization" description="Customize the creator page your fans see: background, banner, avatar, badges, theme, pinned post, and highlighted tier." />
        <StudioNav active="/studio/settings" />
        <Card>
          <StudioSettingsForm
            initial={{
              displayName: user.displayName,
              username: user.username,
              bio: user.bio,
              avatarUrl: user.avatarUrl,
              bannerUrl: user.bannerUrl,
              headline: user.creatorProfile.headline,
              category: user.creatorProfile.category,
              intro: user.creatorProfile.intro,
              themePreset: user.creatorProfile.themePreset,
              backgroundUrl: user.creatorProfile.backgroundUrl,
              backgroundBlur: user.creatorProfile.backgroundBlur,
              avatarMode: user.creatorProfile.avatarMode,
              bannerMode: user.creatorProfile.bannerMode,
              badgeText: user.creatorProfile.badgeText,
              profileAccentColor: user.creatorProfile.profileAccentColor,
              pinnedPostId: user.creatorProfile.pinnedPostId,
              highlightedTierId: user.creatorProfile.highlightedTierId
            }}
            posts={user.posts.map((post) => ({ id: post.id, label: post.title || post.body.slice(0, 60) || "Untitled post" }))}
            tiers={user.creatorProfile.tiers.map((tier) => ({ id: tier.id, label: `${tier.name} · $${(tier.priceCents / 100).toFixed(2)}` }))}
          />
        </Card>
      </div>
    </Shell>
  );
}
