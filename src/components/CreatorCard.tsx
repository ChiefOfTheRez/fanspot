import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import type { Creator } from "@/lib/mock-data";
import { formatCompact } from "@/lib/format";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Card className="group overflow-hidden p-0">
      <div className={`h-24 bg-gradient-to-r ${creator.accent}`} />
      <div className="p-6">
        <div className="-mt-12 mb-4 grid h-16 w-16 place-items-center rounded-3xl border-4 border-slate-950 bg-slate-900 text-xl font-black text-white">
          {creator.displayName.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {creator.isVerified ? <Badge>Verified</Badge> : null}
          {creator.isFoundingCreator ? <Badge tone="green">Founding creator</Badge> : null}
          <Badge tone="gray">{creator.category}</Badge>
        </div>
        <Link href={`/creator/${creator.username}`} className="mt-4 block text-xl font-black text-white group-hover:text-blue-200">
          {creator.displayName}
        </Link>
        <p className="text-sm text-slate-500">@{creator.username}</p>
        <p className="mt-3 min-h-12 text-sm leading-6 text-slate-300">{creator.headline}</p>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-slate-400">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="font-black text-white">{formatCompact(creator.followers)}</p>
            <p>Fans</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="font-black text-white">{creator.posts}</p>
            <p>Posts</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="font-black text-white">{creator.price}</p>
            <p>Start</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
