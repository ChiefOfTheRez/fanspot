import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";

type PageProps = { params: Promise<{ username: string }> };

export const dynamic = "force-dynamic";

export default async function CreatorInfoPage({ params }: PageProps) {
  const { username } = await params;
  const creator = await prisma.user.findUnique({ where: { username }, include: { creatorProfile: true } });
  if (!creator?.creatorProfile) notFound();
  return (
    <Shell active="/discover">
      <div className="space-y-5 pb-24">
        <Card className="overflow-hidden p-0">
          <div className="h-40 bg-gradient-to-r from-blue-900 via-slate-950 to-sky-900" />
          <div className="p-6">
            <Badge tone="blue">@{creator.username}</Badge>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white">{creator.displayName}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{creator.creatorProfile.intro}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link href={`/creator/${creator.username}`} className="rounded-2xl bg-white/10 px-4 py-2 font-bold text-white hover:bg-white/15">Main profile</Link>
              <Link href={`/creator/${creator.username}/posts`} className="rounded-2xl bg-white/10 px-4 py-2 font-bold text-white hover:bg-white/15">Posts</Link>
              <Link href={`/creator/${creator.username}/tiers`} className="rounded-2xl bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-500">Tiers</Link>
            </div>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
