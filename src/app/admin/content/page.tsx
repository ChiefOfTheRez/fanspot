import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { AdminNav } from "@/components/AdminNav";
import { AdminPostActions } from "@/components/AdminPostActions";
import { Card, SectionHeader } from "@/components/Card";
import { FeedPostCard } from "@/components/FeedPostCard";
import { Shell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import type { FeedPost } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function mapPost(post: Awaited<ReturnType<typeof getAdminPosts>>[number]): FeedPost {
  return {
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
}

async function getAdminPosts() {
  return prisma.post.findMany({
    where: { status: { in: ["PENDING_REVIEW", "APPROVED", "FLAGGED"] } },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      author: { select: { username: true, displayName: true, role: true } },
      _count: { select: { comments: true, likes: true, bookmarks: true } }
    },
    take: 100
  });
}

export default async function AdminContentPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/feed");
  const posts = await getAdminPosts();

  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <SectionHeader eyebrow="Admin" title="Content review" description="Approve, flag, or remove posts globally. Admin removals no longer only hide the post for the admin account." />
        <AdminNav active="/admin/content" />
        <Card className="flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2"><Eye className="h-4 w-4 text-blue-200" /> Pending/visible review queue</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-200" /> Approve public content</span>
          <span className="inline-flex items-center gap-2"><XCircle className="h-4 w-4 text-red-200" /> Remove globally</span>
        </Card>
        <div className="space-y-5">
          {posts.length ? posts.map((post) => (
            <Card key={post.id} className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{post.status.replaceAll("_", " ")}</p>
                  <p className="text-sm text-slate-400">By @{post.author.username}</p>
                </div>
                <AdminPostActions id={post.id} status={post.status} />
              </div>
              <FeedPostCard post={mapPost(post)} />
            </Card>
          )) : <Card><p className="p-4 text-sm text-slate-400">No posts in the review queue.</p></Card>}
        </div>
      </div>
    </Shell>
  );
}
