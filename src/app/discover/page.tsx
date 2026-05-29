import Link from "next/link";
import { Search, SlidersHorizontal, Users } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { creatorCategories } from "@/lib/constants";
import { formatCompact } from "@/lib/format";
import { getProfileTheme } from "@/lib/profile-themes";
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
        <SectionHeader eyebrow="Discovery" title="Find creators" description="Approved creator profiles appear here. No demo accounts are shown." />
        <Card>
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <Link href="/search" className="flex items-center rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-slate-400 hover:border-blue-500">
              <Search className="mr-3 h-4 w-4" aria-hidden="true" /> Search creators by name, category, or tag
            </Link>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800 px-4 py-3 text-sm font-bold text-white hover:bg-white/5">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Filters
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {creatorCategories.map((category) => <Badge key={category} tone="gray">{category}</Badge>)}
          </div>
        </Card>
        {creators.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {creators.map((creator) => {
              const theme = getProfileTheme(creator.themePreset);
              const startingTier = creator.tiers[0];
              return (
                <Link key={creator.id} href={`/creator/${creator.user.username}`}>
                  <Card className="group overflow-hidden p-0 transition hover:border-blue-500">
                    <div className={`relative h-32 bg-gradient-to-r ${theme.backgroundClass}`}>
                      {creator.user.bannerUrl ? <img src={creator.user.bannerUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" /> : null}
                    </div>
                    <div className="p-6">
                      <div className="-mt-14 mb-4 grid h-20 w-20 place-items-center overflow-hidden rounded-3xl border-4 border-slate-950 bg-slate-900 text-xl font-black text-white">
                        {creator.user.avatarUrl ? <img src={creator.user.avatarUrl} alt="" className="h-full w-full object-cover" /> : creator.user.displayName.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {creator.isVerified ? <Badge>Verified</Badge> : null}
                        {creator.isFoundingCreator ? <Badge tone="green">Founding creator</Badge> : null}
                        <Badge tone="gray">{creator.category}</Badge>
                      </div>
                      <h2 className="mt-4 text-xl font-black text-white group-hover:text-blue-200">{creator.user.displayName}</h2>
                      <p className="text-sm text-slate-500">@{creator.user.username}</p>
                      <p className="mt-3 min-h-12 text-sm leading-6 text-slate-300">{creator.headline}</p>
                      <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-slate-400">
                        <div className="rounded-2xl bg-white/5 p-3"><p className="font-black text-white">{formatCompact(creator.profileCompletion)}</p><p>Score</p></div>
                        <div className="rounded-2xl bg-white/5 p-3"><p className="font-black text-white">{creator.tiers.length}</p><p>Tiers</p></div>
                        <div className="rounded-2xl bg-white/5 p-3"><p className="font-black text-white">{startingTier ? (startingTier.priceCents === 0 ? "Free" : `$${(startingTier.priceCents / 100).toFixed(2)}`) : "Free"}</p><p>Start</p></div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState icon={<Users className="h-10 w-10" />} title="No creators yet" description="Approved creator accounts will appear here after applications are reviewed." />
        )}
      </div>
    </Shell>
  );
}
