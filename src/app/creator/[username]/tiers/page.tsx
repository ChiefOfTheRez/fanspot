import { notFound } from "next/navigation";
import { CreatorTierCard } from "@/components/CreatorTierCard";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";

type PageProps = { params: Promise<{ username: string }> };

export const dynamic = "force-dynamic";

export default async function CreatorTiersPage({ params }: PageProps) {
  const { username } = await params;
  const creator = await prisma.user.findUnique({ where: { username }, include: { creatorProfile: { include: { tiers: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } } } } });
  if (!creator?.creatorProfile) notFound();
  return (
    <Shell active="/discover">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow={`@${creator.username}`} title={`${creator.displayName} tiers`} description="Choose a tier to follow public updates or unlock supporter posts when subscriptions are enabled." />
        <div className="grid gap-4 md:grid-cols-3">
          {creator.creatorProfile.tiers.length ? creator.creatorProfile.tiers.map((tier) => <CreatorTierCard key={tier.id} name={tier.name} price={tier.priceCents === 0 ? "Free" : `$${(tier.priceCents / 100).toFixed(2)}/mo`} description={tier.description} features={["Creator posts", "Community updates", tier.priceCents === 0 ? "Public access" : "Supporter access"]} highlighted={tier.id === creator.creatorProfile?.highlightedTierId} />) : <p className="text-sm text-slate-400">No tiers are available yet.</p>}
        </div>
      </div>
    </Shell>
  );
}
