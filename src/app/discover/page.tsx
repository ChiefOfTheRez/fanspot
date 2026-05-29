import { SectionHeader } from "@/components/Card";
import { DiscoverClient } from "@/components/DiscoverClient";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DiscoverPage() {
  const creators = await prisma.creatorProfile.findMany({
    where: { isAcceptingFans: true },
    include: {
      user: { select: { username: true, displayName: true, avatarUrl: true, bannerUrl: true } },
      tiers: { where: { isActive: true }, orderBy: { sortOrder: "asc" }, take: 1 }
    },
    orderBy: [{ featuredRank: "asc" }, { createdAt: "desc" }],
    take: 50
  });

  return (
    <Shell active="/discover" rightRail={<RightRail />}>
      <div className="space-y-6 pb-24">
        <SectionHeader eyebrow="Discovery" title="Find creators" description="Search and filter without leaving discovery so fans naturally see more creator profiles." />
        <DiscoverClient creators={creators} />
      </div>
    </Shell>
  );
}
