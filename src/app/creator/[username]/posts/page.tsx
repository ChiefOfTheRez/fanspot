import { notFound } from "next/navigation";
import { FeedPostCard } from "@/components/FeedPostCard";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";
import type { FeedPost } from "@/lib/mock-data";

type PageProps = { params: Promise<{ username: string }> };

export const dynamic = "force-dynamic";

export default async function CreatorPostsPage({ params }: PageProps) {
  const { username } = await params;
  const creator = await prisma.user.findUnique({ where: { username }, include: { creatorProfile: true } });
  if (!creator?.creatorProfile) notFound();
  // Fetch all approved posts by this creator (universal visibility). We remove the
  // visibility filter so fans can browse the full archive. UI components can
  // still indicate if a post requires following or supporting.
  const posts = await prisma.post.findMany({ where: { authorId: creator.id, status: "APPROVED" }, orderBy: { createdAt: "desc" }, include: { _count: { select: { comments: true, likes: true, bookmarks: true } } } });
  const mapped: FeedPost[] = posts.map((post) => ({
    id: post.id,
    authorUsername: creator.username,
    author: creator.displayName,
    avatar: creator.displayName.slice(0, 2).toUpperCase(),
    headline: creator.creatorProfile?.headline ?? "Creator",
    title: post.title ?? "Post",
    body: post.body,
    visibility: post.visibility === "PUBLIC" ? "Public" : post.visibility === "FOLLOWERS" ? "Followers" : "Supporters",
    createdAt: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(post.createdAt),
    likes: post._count.likes,
    comments: post._count.comments,
    bookmarks: post._count.bookmarks
  }));
  return (
    <Shell active="/discover">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow={`@${creator.username}`} title={`${creator.displayName} posts`} description="Public post archive." />
        {mapped.length ? mapped.map((post) => <FeedPostCard key={post.id} post={post} />) : <p className="text-sm text-slate-400">No public posts yet.</p>}
      </div>
    </Shell>
  );
}
