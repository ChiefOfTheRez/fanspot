import { Edit3, Link as LinkIcon, MapPin, ShieldCheck } from "lucide-react";
import { getServerSession } from "next-auth";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { FeedPostCard } from "@/components/FeedPostCard";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FeedPost } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          posts: {
            where: { status: "APPROVED" },
            orderBy: { createdAt: "desc" },
            include: { _count: { select: { comments: true, likes: true, bookmarks: true } } },
            take: 5
          }
        }
      })
    : null;

  const posts: FeedPost[] = user
    ? user.posts.map((post) => ({
        id: post.id,
        authorUsername: user.username,
        author: user.displayName,
        avatar: initials(user.displayName),
        headline: user.role === "ADMIN" ? "Admin" : user.role === "CREATOR" ? "Creator" : "Fan",
        title: post.title ?? "Post",
        body: post.body,
        visibility: post.visibility === "PUBLIC" ? "Public" : post.visibility === "FOLLOWERS" ? "Followers" : "Supporters",
        createdAt: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(post.createdAt),
        likes: post._count.likes,
        comments: post._count.comments,
        bookmarks: post._count.bookmarks
      }))
    : [];

  return (
    <Shell active="/profile" rightRail={<RightRail />}>
      <div className="space-y-5 pb-24">
        <Card className="overflow-hidden p-0">
          <div className="h-44 bg-gradient-to-r from-blue-700 via-blue-500 to-sky-300" />
          <div className="p-6">
            <div className="-mt-16 grid h-24 w-24 place-items-center rounded-[2rem] border-4 border-slate-950 bg-slate-900 text-3xl font-black text-white">{initials(user?.displayName ?? "User")}</div>
            <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-black text-white">{user?.displayName ?? "FanSpot User"}</h1>
                  <Badge><ShieldCheck className="mr-1 h-3 w-3" /> {user?.role ?? "FAN"}</Badge>
                </div>
                <p className="mt-1 text-slate-500">@{user?.username ?? "user"}</p>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{user?.bio || "Your profile is ready. Add profile editing next."}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                  {user?.location ? <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {user.location}</span> : null}
                  {user?.websiteUrl ? <span className="inline-flex items-center gap-2"><LinkIcon className="h-4 w-4" /> {user.websiteUrl}</span> : null}
                </div>
              </div>
              <button className="inline-flex cursor-not-allowed items-center gap-2 rounded-2xl border border-slate-800 px-4 py-3 text-sm font-bold text-slate-400">
                <Edit3 className="h-4 w-4" /> Edit profile soon
              </button>
            </div>
          </div>
        </Card>
        <div>
          <h2 className="mb-4 text-xl font-black text-white">Your posts</h2>
          <div className="space-y-5">
            {posts.length ? posts.map((post) => <FeedPostCard key={post.id} post={post} />) : <EmptyState title="No posts on your profile yet" description="Create your first post from the home feed and it will appear here." />}
          </div>
        </div>
      </div>
    </Shell>
  );
}
