"use client";

import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { creatorCategories } from "@/lib/constants";
import { formatCompact } from "@/lib/format";
import { getProfileTheme } from "@/lib/profile-themes";

type CreatorCardData = {
  id: string;
  headline: string;
  category: string;
  isVerified: boolean;
  isFoundingCreator: boolean;
  profileCompletion: number;
  themePreset: string;
  user: { username: string; displayName: string; avatarUrl: string | null; bannerUrl: string | null };
  tiers: Array<{ priceCents: number }>;
};

export function DiscoverClient({ creators }: { creators: CreatorCardData[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredCreators = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return creators.filter((creator) => {
      const matchesCategory = activeCategory === "All" || creator.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesVerified = !verifiedOnly || creator.isVerified;
      const matchesQuery = !normalized || [creator.user.displayName, creator.user.username, creator.category, creator.headline].some((value) => value.toLowerCase().includes(normalized));
      return matchesCategory && matchesVerified && matchesQuery;
    });
  }, [activeCategory, creators, query, verifiedOnly]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="flex items-center rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-slate-300 focus-within:border-blue-500">
            <Search className="mr-3 h-4 w-4 text-slate-500" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search creators while browsing discovery"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </label>
          <button type="button" onClick={() => setVerifiedOnly((value) => !value)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800 px-4 py-3 text-sm font-bold text-white hover:bg-white/5">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> {verifiedOnly ? "Verified only" : "All creators"}
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["All", ...creatorCategories].map((category) => (
            <button key={category} type="button" onClick={() => setActiveCategory(category)} className="transition hover:scale-[1.02]">
              <Badge tone={activeCategory === category ? "blue" : "gray"}>{category}</Badge>
            </button>
          ))}
        </div>
      </Card>

      {filteredCreators.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredCreators.map((creator) => {
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
        <EmptyState icon={<Search className="h-10 w-10" />} title="No creators found" description="Try another search or category." />
      )}
    </div>
  );
}
