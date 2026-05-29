"use client";

import Link from "next/link";
import { Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import type { FeedPost } from "@/lib/mock-data";
import { formatCompact } from "@/lib/format";

export function FeedPostCard({ post }: { post: FeedPost }) {
  // Enable local interaction for likes, bookmarks and overflow menu. These handlers update state but do not persist changes to the backend.
  const [likeCount, setLikeCount] = useState(post.likes);
  const [bookmarkCount, setBookmarkCount] = useState(post.bookmarks);

  function handleLike() {
    setLikeCount((count) => count + 1);
  }
  function handleBookmark() {
    setBookmarkCount((count) => count + 1);
  }
  function handleMore() {
    alert("More actions coming soon!");
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <Avatar name={post.author} label={post.avatar} />
          <div>
            <Link href={`/creator/${post.authorUsername}`} className="font-black text-white hover:text-blue-200">
              {post.author}
            </Link>
            <p className="text-xs text-slate-500">{post.headline} · {post.createdAt}</p>
          </div>
        </div>
        <button onClick={handleMore} className="rounded-full p-2 text-slate-500 hover:bg-white/5 hover:text-white" aria-label="More actions">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge tone={post.visibility === "Public" ? "blue" : post.visibility === "Followers" ? "green" : "yellow"}>{post.visibility}</Badge>
      </div>

      <h3 className="mt-5 text-xl font-black text-white">{post.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{post.body}</p>

      {post.mediaLabel ? (
        <div className="mt-5 rounded-[1.5rem] border border-blue-400/20 bg-gradient-to-br from-blue-600/25 via-slate-900 to-slate-950 p-8">
          <div className="grid min-h-48 place-items-center rounded-3xl border border-white/10 bg-black/20 text-center">
            <div>
              <p className="text-sm font-bold text-blue-200">{post.mediaLabel}</p>
              <p className="mt-2 text-xs text-slate-400">Media preview</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-5 flex items-center gap-4 border-t border-slate-800 pt-4 text-sm text-slate-400">
        <button onClick={handleLike} className="flex items-center gap-2 hover:text-white"><Heart className="h-4 w-4" />{formatCompact(likeCount)}</button>
        <button onClick={() => alert('Comment functionality coming soon!')} className="flex items-center gap-2 hover:text-white"><MessageCircle className="h-4 w-4" />{formatCompact(post.comments)}</button>
        <button onClick={handleBookmark} className="flex items-center gap-2 hover:text-white"><Bookmark className="h-4 w-4" />{formatCompact(bookmarkCount)}</button>
      </div>
    </Card>
  );
}
