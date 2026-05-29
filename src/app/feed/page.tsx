import { getServerSession } from "next-auth";
import type { Prisma } from "@prisma/client";
import { FileText } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { FeedPostCard } from "@/components/FeedPostCard";
import { PostComposer } from "@/components/PostComposer";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FeedPost } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

function mapPost(post: Awaited<ReturnType<typeof getPosts>>[number]): FeedPost {
  const visibilityMap = { PUBLIC: "Public", FOLLOWERS: "Followers", SUPPORTERS: "Supporters" } as const;
  return {
    id: post.id,
    authorUsername: post.author.username,
    author: post.author.displayName,
    avatar: post.author.displayName.slice(0, 2).toUpperCase(),
    headline: post.author.role === "ADMIN" ? "Admin" : post.author.role === "CREATOR" ? "Creator" : "Fan",
    title: post.title ?? "Post",
    body: post.body,
    visibility: visibilityMap[post.visibility],
    createdAt: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(post.createdAt),
    likes: post._count.likes,
    comments: post._count.comments,
    bookmarks: post._count.bookmarks
  };
}

async function getPosts(viewerId?: string) {
  const accessFilters: Prisma.PostWhereInput[] = [{ visibility: "PUBLIC" }];
  if (viewerId) {
    accessFilters.push({ authorId: viewerId });
    accessFilters.push({ visibility: "FOLLOWERS", author: { followers: { some: { fanId: viewerId } } } });
    accessFilters.push({ visibility: "SUPPORTERS", author: { subscribers: { some: { fanId: viewerId, status: "ACTIVE" } } } });
  }

  return prisma.post.findMany({
    where: { status: "APPROVED", OR: accessFilters },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    include: {
      author: { select: { username: true, displayName: true, role: true } },
      _count: { select: { comments: true, likes: true, bookmarks: true } }
    },
    take: 50
  });
}

export default async function FeedPage() {
  const session = await getServerSession(authOptions);
  const viewer = session?.user?.id
    ? await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } })
    : null;
  const canPost = viewer?.role === "CREATOR" || viewer?.role === "ADMIN";
  const posts = (await getPosts(session?.user?.id)).map(mapPost);

  return (
    <Shell active="/feed" rightRail={<RightRail />}>
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Home feed</h1>
          <p className="mt-2 text-sm text-slate-400">Follow creators, read public posts, and comment on posts you have access to.</p>
        </div>
        {canPost ? <PostComposer /> : null}
        {posts.length ? (
          posts.map((post) => <FeedPostCard key={post.id} post={post} />)
        ) : (
          <EmptyState icon={<FileText className="h-10 w-10" />} title="No posts yet" description={canPost ? "Create your first post from the composer above." : "Your home feed is empty. Discover creators to start building it."} />
        )}
      </div>
    </Shell>
  );
}
