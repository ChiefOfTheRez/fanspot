import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { creators } from "@/lib/mock-data";

export function RightRail() {
  return (
    <div className="sticky top-24 space-y-5">
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-black text-white">Recommended</h3>
          <Link href="/discover" className="text-xs font-bold text-blue-300 hover:text-white">View all</Link>
        </div>
        <div className="mt-4 space-y-4">
          {creators.length ? creators.slice(0, 3).map((creator) => (
            <Link key={creator.id} href={`/creator/${creator.username}`} className="flex gap-3 rounded-2xl p-2 hover:bg-white/5">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 font-black text-white">
                {creator.displayName.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{creator.displayName}</p>
                <p className="truncate text-xs text-slate-500">{creator.category} · {creator.price}</p>
              </div>
            </Link>
          )) : <p className="rounded-2xl border border-slate-800 bg-white/5 p-4 text-sm leading-6 text-slate-400">Creator recommendations will appear here as the community grows.</p>}
        </div>
      </Card>

      <Card>
        <Badge tone="green">Safety first</Badge>
        <h3 className="mt-4 font-black text-white">Community controls</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">FanSpot includes account protection, reporting, and moderation workflows to help keep the community healthy.</p>
      </Card>

      <Card className="bg-blue-600/10">
        <h3 className="font-black text-white">Create your space</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">Apply for creator tools when you are ready to publish, manage posts, and build a community.</p>
        <Link href="/creator/apply" className="mt-5 inline-flex rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">
          Apply as creator
        </Link>
      </Card>
    </div>
  );
}
