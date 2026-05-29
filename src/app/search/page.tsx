import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RightRail } from "@/components/RightRail";
import { SearchFilters } from "@/components/SearchFilters";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const q = params.q?.trim() ?? "";
  const creators = q
    ? await prisma.creatorProfile.findMany({
        where: { OR: [{ user: { displayName: { contains: q } } }, { user: { username: { contains: q } } }, { category: { contains: q } }, { headline: { contains: q } }] },
        include: { user: { select: { username: true, displayName: true, avatarUrl: true } } },
        take: 20
      })
    : [];

  return (
    <Shell active="/discover" rightRail={<RightRail />}>
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Search" title="Find creators, posts, and communities" description="Search approved creator profiles. More filters can be added after real usage patterns are clear." />
        <SearchFilters />
        {q ? <p className="text-sm text-slate-400">Results for <span className="font-bold text-white">{q}</span></p> : null}
        <div className="grid gap-4 md:grid-cols-2">
          {creators.map((creator) => (
            <Link key={creator.id} href={`/creator/${creator.user.username}`}>
              <Card className="transition hover:border-blue-500 hover:bg-blue-600/10">
                <div className="flex gap-4">
                  <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-blue-600 font-black text-white">
                    {creator.user.avatarUrl ? <img src={creator.user.avatarUrl} alt="" className="h-full w-full object-cover" /> : creator.user.displayName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2"><Badge tone="gray">{creator.category}</Badge>{creator.isVerified ? <Badge>Verified</Badge> : null}</div>
                    <h2 className="mt-2 font-black text-white">{creator.user.displayName}</h2>
                    <p className="text-sm text-slate-500">@{creator.user.username}</p>
                    <p className="mt-2 text-sm text-slate-300">{creator.headline}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {!q ? <Card><p className="text-sm text-slate-400">Type a search term above to find creators.</p></Card> : null}
        {q && creators.length === 0 ? <Card><p className="text-sm text-slate-400">No creators found.</p></Card> : null}
      </div>
    </Shell>
  );
}
