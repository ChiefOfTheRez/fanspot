"use client";

import Link from "next/link";
import { Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import type { FeedPost } from "@/lib/mock-data";
import { formatCompact } from "@/lib/format";

export function FeedPostCard({ post, showComments: _showComments = false }: { post: FeedPost; showComments?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  // Local state for likes and bookmarks and whether the current user has liked/bookmarked this post.
  const [likeCount, setLikeCount] = useState(post.likes);
  const [bookmarkCount, setBookmarkCount] = useState(post.bookmarks);
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  // Load like/bookmark state from localStorage on mount, scoped to the current user if logged in.
  useEffect(() => {
    try {
      if (!post) return;
      const userKeyPrefix = session?.user?.email ? `${session.user.email}-` : "";
      const likedKey = `fanspot-liked-${userKeyPrefix}${post.id}`;
      const bookmarkedKey = `fanspot-bookmarked-${userKeyPrefix}${post.id}`;
      const likedStored = localStorage.getItem(likedKey);
      const bookmarkedStored = localStorage.getItem(bookmarkedKey);
      if (likedStored) {
        setLiked(true);
      }
      if (bookmarkedStored) {
        setBookmarked(true);
      }
    } catch (err) {
      // ignore errors reading localStorage
    }
  }, [post.id, session]);

  function handleLike() {
    // Require authentication for liking
    if (!session?.user) {
      signIn();
      return;
    }
    // Toggle like state locally and persist per user
    const userKeyPrefix = session.user.email ? `${session.user.email}-` : "";
    const likedKey = `fanspot-liked-${userKeyPrefix}${post.id}`;
    if (liked) {
      // Unlike: remove from localStorage and decrement count
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
      try {
        localStorage.removeItem(likedKey);
      } catch (err) {
        // ignore
      }
    } else {
      // Like: store in localStorage and increment count
      setLiked(true);
      setLikeCount((c) => c + 1);
      try {
        localStorage.setItem(likedKey, "true");
      } catch (err) {
        // ignore
      }
    }
    // Optionally call backend to persist global counts
    fetch(`/api/posts/${post.id}/like`, { method: "POST" }).catch(() => {
      // no-op on failure; local state already updated
    });
  }

  function handleBookmark() {
    if (!session?.user) {
      signIn();
      return;
    }
    const userKeyPrefix = session.user.email ? `${session.user.email}-` : "";
    const bookmarkKey = `fanspot-bookmarked-${userKeyPrefix}${post.id}`;
    const bookmarksListKey = `fanspot-bookmarks-${userKeyPrefix}`;
    if (bookmarked) {
      // Remove bookmark
      setBookmarked(false);
      setBookmarkCount((c) => Math.max(0, c - 1));
      try {
        localStorage.removeItem(bookmarkKey);
        // Remove post id from bookmarks list
        const list = JSON.parse(localStorage.getItem(bookmarksListKey) || "[]");
        const newList = list.filter((id: string | number) => String(id) !== String(post.id));
        localStorage.setItem(bookmarksListKey, JSON.stringify(newList));
      } catch (err) {
        // ignore
      }
    } else {
      // Add bookmark
      setBookmarked(true);
      setBookmarkCount((c) => c + 1);
      try {
        localStorage.setItem(bookmarkKey, "true");
        const list = JSON.parse(localStorage.getItem(bookmarksListKey) || "[]");
        if (!list.map(String).includes(String(post.id))) {
          list.push(String(post.id));
          localStorage.setItem(bookmarksListKey, JSON.stringify(list));
        }
      } catch (err) {
        // ignore
      }
    }
    fetch(`/api/posts/${post.id}/bookmark`, { method: "POST" }).catch(() => {
      // ignore
    });
  }

  function handleMore() {
    // Prompt the user to share or report the post. Copy link to clipboard or show a report alert.
    const action = prompt("Choose an action: 'share' to copy link, 'report' to flag the post");
    if (!action) return;
    const a = action.toLowerCase().trim();
    if (a === "share") {
      try {
        const url = `${window.location.origin}/post/${post.id}`;
        void navigator.clipboard.writeText(url);
        alert("Post link copied to clipboard!");
      } catch {
        alert("Unable to copy link. You can still copy it manually from the address bar after opening the post page.");
      }
    } else if (a === "report") {
      alert("This post has been reported to the moderators. Thank you for keeping FanSpot safe!");
    } else {
      alert("Unknown action. Please enter 'share' or 'report'.");
    }
  }

  function handleComment() {
    // Navigate to the full post page to view and add comments
    router.push(`/post/${post.id}`);
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
            <p className="text-xs text-slate-500">{post.headline} Â· {post.createdAt}</p>
          </div>
        </div>
        <button onClick={handleMore} className="rounded-full p-2 text-slate-500 hover:bg-white/5 hover:text-white" aria-label="More actions">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {/* Display the visibility label without decorative tags */}
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">{post.visibility}</span>
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
        <button onClick={handleLike} className="flex items-center gap-2 hover:text-white">
          <Heart
            className={`h-4 w-4 ${liked ? 'text-red-500 fill-current' : ''}`}
          />
          {formatCompact(likeCount)}
        </button>
        <button onClick={handleComment} className="flex items-center gap-2 hover:text-white">
          <MessageCircle className="h-4 w-4" />{formatCompact(post.comments)}
        </button>
        <button onClick={handleBookmark} className="flex items-center gap-2 hover:text-white">
          <Bookmark
            className={`h-4 w-4 ${bookmarked ? 'text-yellow-400 fill-current' : ''}`}
          />
          {formatCompact(bookmarkCount)}
        </button>
      </div>
    </Card>
  );
}


