import Link from "next/link";
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

      {/* Removed safety and create-your-space cards. Only recommended creators are shown on the right rail. */}
    </div>
  );
}
