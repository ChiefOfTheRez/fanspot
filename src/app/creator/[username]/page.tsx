import { getServerSession } from "next-auth";
import type { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { Bell, CheckCircle2, Lock, MessageCircle, Pin, Sparkles, Star, Users } from "lucide-react";
import { Badge } from "@/components/Badge";
import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { FeedPostCard } from "@/components/FeedPostCard";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import { formatCompact } from "@/lib/format";
import type { FeedPost } from "@/lib/mock-data";
import { parseBadges, getProfileTheme } from "@/lib/profile-themes";
import { prisma } from "@/lib/prisma";

type PageProps = { params: Promise<{ username: string }> };

function mapPost(post: NonNullable<Awaited<ReturnType<typeof getCreator>>>["posts"][number]): FeedPost {
  const visibilityMap = { PUBLIC: "Public", FOLLOWERS: "Followers", SUPPORTERS: "Supporters" } as const;
  return {
    id: post.id,
    authorUsername: post.author.username,
    author: post.author.displayName,
    avatar: post.author.displayName.slice(0, 2).toUpperCase(),
    headline: post.author.creatorProfile?.headline ?? "Creator",
    title: post.title ?? "Post",
    body: post.body,
    visibility: visibilityMap[post.visibility],
    createdAt: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(post.createdAt),
    likes: post._count.likes,
    comments: post._count.comments,
    bookmarks: post._count.bookmarks
  };
}

async function getCreator(username: string, viewerId?: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      creatorProfile: { include: { tiers: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } } }
    }
  });

  if (!user?.creatorProfile) return null;

  const accessFilters: Prisma.PostWhereInput[] = [{ visibility: "PUBLIC" }];
  if (viewerId) {
    if (viewerId === user.id) accessFilters.push({ authorId: user.id });
    accessFilters.push({ visibility: "FOLLOWERS", author: { followers: { some: { fanId: viewerId } } } });
    accessFilters.push({ visibility: "SUPPORTERS", author: { subscribers: { some: { fanId: viewerId, status: "ACTIVE" } } } });
  }

  const posts = await prisma.post.findMany({
    where: { authorId: user.id, status: "APPROVED", OR: accessFilters },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    include: { author: { select: { username: true, displayName: true, creatorProfile: { select: { headline: true } } } }, _count: { select: { comments: true, likes: true, bookmarks: true } } },
    take: 30
  });

  const pinnedPost = user.creatorProfile.pinnedPostId ? posts.find((post) => post.id === user.creatorProfile?.pinnedPostId) : posts.find((post) => post.isPinned);
  const followerCount = await prisma.follow.count({ where: { creatorId: user.id } });
  const postCount = await prisma.post.count({ where: { authorId: user.id, status: "APPROVED" } });

  const isSupporter = viewerId
    ? Boolean(await prisma.subscription.findUnique({ where: { fanId_creatorId: { fanId: viewerId, creatorId: user.id } }, select: { id: true, status: true } }))
    : false;

  return { user, profile: user.creatorProfile, posts, pinnedPost, followerCount, postCount, isSupporter };
}

export default async function CreatorProfilePage({ params }: PageProps) {
  const { username } = await params;
  const session = await getServerSession(authOptions);
  const creator = await getCreator(username, session?.user?.id);
  if (!creator) notFound();

  const { user, profile } = creator;
  const theme = getProfileTheme(profile.themePreset);
  const badges = parseBadges(profile.badgeText);
  const highlightedTier = profile.highlightedTierId ? profile.tiers.find((tier) => tier.id === profile.highlightedTierId) : profile.tiers[1] ?? profile.tiers[0];
  const regularTiers = profile.tiers.filter((tier) => tier.id !== highlightedTier?.id);
  const posts = creator.posts.filter((post) => post.id !== creator.pinnedPost?.id).map(mapPost);

  return (
    <Shell active="/discover" rightRail={<RightRail />}>
      <div className={`relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-gradient-to-br ${theme.backgroundClass} p-4 shadow-2xl md:p-6`}>
        {profile.backgroundUrl ? <img src={profile.backgroundUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" style={{ filter: `blur(${profile.backgroundBlur}px)` }} /> : null}
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 space-y-5 pb-24">
          <Card className={`overflow-hidden p-0 ${theme.panelClass}`}>
            <div className="relative h-64">
              {user.bannerUrl ? <img src={user.bannerUrl} alt={`${user.displayName} banner`} className="h-full w-full object-cover" /> : <div className={`h-full bg-gradient-to-r ${theme.backgroundClass}`} />}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-end gap-4">
                <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-[2rem] border-4 border-slate-950 bg-slate-900 text-3xl font-black text-white shadow-2xl">
                  {user.avatarUrl ? <img src={user.avatarUrl} alt={`${user.displayName} avatar`} className="h-full w-full object-cover" /> : user.displayName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">{user.displayName}</h1>
                    {profile.isVerified ? <Badge><CheckCircle2 className="mr-1 h-3 w-3" aria-hidden="true" /> Verified</Badge> : null}
                    {profile.isFoundingCreator ? <Badge tone="green">Founding creator</Badge> : null}
                  </div>
                  <p className="mt-1 text-sm text-slate-300">@{user.username} · {profile.headline}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-6 lg:grid-cols-[1fr_320px]">
              <div>
                <p className="max-w-3xl text-sm leading-7 text-slate-300">{profile.intro}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Badge tone="gray">{profile.category}</Badge>
                  <Badge tone="blue"><Users className="mr-1 h-3 w-3" aria-hidden="true" /> {formatCompact(creator.followerCount)} fans</Badge>
                  <Badge tone="gray">{creator.postCount} posts</Badge>
                  {badges.map((badge) => <Badge key={badge} tone="yellow"><Sparkles className="mr-1 h-3 w-3" aria-hidden="true" /> {badge}</Badge>)}
                </div>
              </div>
              <div className="space-y-3 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-700 px-4 py-3 text-sm font-bold text-white hover:bg-white/5"><Bell className="h-4 w-4" aria-hidden="true" /> Follow</button>
                  <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500"><Star className="h-4 w-4" aria-hidden="true" /> Support</button>
                </div>
                <ButtonLink href="/messages" variant="secondary"><MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Message</ButtonLink>
              </div>
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <div className="space-y-5">
              {creator.pinnedPost ? (
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-black text-blue-200"><Pin className="h-4 w-4" aria-hidden="true" /> Pinned post</div>
                  <FeedPostCard post={mapPost(creator.pinnedPost)} />
                </div>
              ) : null}

              <Card className={theme.panelClass}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-white">Creator posts</h2>
                    <p className="mt-1 text-sm text-slate-400">Public posts are visible to everyone. Supporter posts unlock with an active tier.</p>
                  </div>
                  <Badge tone="yellow"><Lock className="mr-1 h-3 w-3" aria-hidden="true" /> Access controlled</Badge>
                </div>
              </Card>

              <div className="space-y-5">
                {posts.length ? posts.map((post) => <FeedPostCard key={post.id} post={post} />) : <Card><p className="text-sm text-slate-400">No visible posts yet.</p></Card>}
              </div>
            </div>

            <aside className="space-y-5">
              {highlightedTier ? <TierCard title={highlightedTier.name} price={highlightedTier.priceCents === 0 ? "Free" : `$${(highlightedTier.priceCents / 100).toFixed(2)}/mo`} text={highlightedTier.description} highlighted /> : null}
              {regularTiers.map((tier) => <TierCard key={tier.id} title={tier.name} price={tier.priceCents === 0 ? "Free" : `$${(tier.priceCents / 100).toFixed(2)}/mo`} text={tier.description} />)}
              <Card className={theme.panelClass}>
                <h3 className="font-black text-white">Profile awards</h3>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {badges.length ? badges.slice(0, 8).map((badge) => <div key={badge} title={badge} className="grid aspect-square place-items-center rounded-2xl border border-white/10 bg-white/10 text-xs font-black text-white">{badge.slice(0, 2).toUpperCase()}</div>) : <p className="col-span-4 text-sm text-slate-400">No badges yet.</p>}
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function TierCard({ title, price, text, highlighted }: { title: string; price: string; text: string; highlighted?: boolean }) {
  return (
    <Card className={highlighted ? "border-blue-500 bg-blue-600/10" : undefined}>
      {highlighted ? <Badge tone="blue">Highlighted tier</Badge> : null}
      <h3 className="mt-3 font-black text-white">{title}</h3>
      <p className="mt-2 text-2xl font-black text-white">{price}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
    </Card>
  );
}
