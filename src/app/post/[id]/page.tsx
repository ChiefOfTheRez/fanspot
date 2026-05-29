import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { CommentForm } from "@/components/CommentForm";
import { FeedPostCard } from "@/components/FeedPostCard";
import { PageHero } from "@/components/PageHero";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { viewerCanAccessPost } from "@/lib/access";
import { authOptions } from "@/lib/auth";
import { feedPosts } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";
import type { FeedPost } from "@/lib/mock-data";

type PageProps = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { username: true, displayName: true, role: true } },
      comments: { orderBy: { createdAt: "asc" }, include: { author: { select: { username: true, displayName: true } } } },
      _count: { select: { comments: true, likes: true, bookmarks: true } }
    }
  });

  if (!post) {
    const mockPost = feedPosts.find((item) => item.id === id);
    if (!mockPost) notFound();
    return (
      <Shell active="/feed" rightRail={<RightRail />}>
        <div className="space-y-5 pb-24">
          <PageHero title={mockPost.title} description="Single-post detail page." />
          <FeedPostCard post={mockPost} showComments />
        </div>
      </Shell>
    );
  }

  if (post.status !== "APPROVED") notFound();
  const canAccess = await viewerCanAccessPost({ viewerId: session?.user?.id, postId: id, authorId: post.authorId, visibility: post.visibility });
  if (!canAccess) notFound();

  const viewer = session?.user?.id ? await prisma.user.findUnique({ where: { id: session.user.id }, select: { emailVerified: true } }) : null;
  const disabledReason = !session?.user?.id ? "Log in to comment." : !viewer?.emailVerified ? "Verify your email before commenting." : undefined;

  const mapped: FeedPost = {
    id: post.id,
    authorUsername: post.author.username,
    author: post.author.displayName,
    avatar: post.author.displayName.slice(0, 2).toUpperCase(),
    headline: post.author.role === "ADMIN" ? "Admin" : post.author.role === "CREATOR" ? "Creator" : "Fan",
    title: post.title ?? "Post",
    body: post.body,
    visibility: post.visibility === "PUBLIC" ? "Public" : post.visibility === "FOLLOWERS" ? "Followers" : "Supporters",
    createdAt: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(post.createdAt),
    likes: post._count.likes,
    comments: post._count.comments,
    bookmarks: post._count.bookmarks
  };

  return (
    <Shell active="/feed" rightRail={<RightRail />}>
      <div className="space-y-5 pb-24">
        <PageHero title={mapped.title} description="Single-post detail page with access-controlled commenting." />
        <FeedPostCard post={mapped} showComments />
        <Card>
          <h2 className="text-xl font-black text-white">Server comments</h2>
          <div className="mt-5"><CommentForm postId={post.id} disabledReason={disabledReason} /></div>
          <div className="mt-6 space-y-3">
            {post.comments.length ? post.comments.map((comment) => (
              <div key={comment.id} className="rounded-2xl border border-slate-800 bg-white/5 p-4">
                <p className="text-sm font-black text-white">{comment.author.displayName} <span className="font-normal text-slate-500">@{comment.author.username}</span></p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{comment.body}</p>
              </div>
            )) : <p className="text-sm text-slate-400">No server comments yet.</p>}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
