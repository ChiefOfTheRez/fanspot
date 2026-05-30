import { getServerSession } from "next-auth";
import { BookmarksClient } from "@/components/BookmarksClient";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import type { FeedPost } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions);
  const bookmarks = session?.user?.id
    ? await prisma.bookmark.findMany({
        where: { userId: session.user.id, post: { status: "APPROVED" } },
        orderBy: { createdAt: "desc" },
        include: {
          post: {
            include: {
              author: { select: { username: true, displayName: true, role: true, creatorProfile: { select: { headline: true } } } },
              _count: { select: { comments: true, likes: true, bookmarks: true } }
            }
          }
        }
      })
    : [];

  const posts: FeedPost[] = bookmarks.map(({ post }) => ({
    id: post.id,
    authorUsername: post.author.username,
    author: post.author.displayName,
    avatar: post.author.displayName.slice(0, 2).toUpperCase(),
    headline: post.author.creatorProfile?.headline ?? (post.author.role === "ADMIN" ? "Admin" : post.author.role === "CREATOR" ? "Creator" : "Fan"),
    title: post.title ?? "Post",
    body: post.body,
    visibility: post.visibility === "PUBLIC" ? "Public" : post.visibility === "FOLLOWERS" ? "Followers" : "Supporters",
    createdAt: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(post.createdAt),
    likes: post._count.likes,
    comments: post._count.comments,
    bookmarks: post._count.bookmarks
  }));

  return (
    <Shell active="/bookmarks" rightRail={<RightRail />}>
      <BookmarksClient initialPosts={posts} />
    </Shell>
  );
}
