"use client";

import Link from "next/link";
import { Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import type { FeedPost } from "@/lib/mock-data";
import { formatCompact } from "@/lib/format";

export function FeedPostCard({ post }: { post: FeedPost }) {
  // Local state for likes and bookmarks and whether the current user has liked/bookmarked this post.
  const [likeCount, setLikeCount] = useState(post.likes);
  const [bookmarkCount, setBookmarkCount] = useState(post.bookmarks);
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  // Load like/bookmark state from localStorage on mount.
  useEffect(() => {
    try {
      const likedKey = `fanspot-liked-${post.id}`;
      const bookmarkedKey = `fanspot-bookmarked-${post.id}`;
      const likeCountKey = `fanspot-like-count-${post.id}`;
      const bookmarkCountKey = `fanspot-bookmark-count-${post.id}`;
      const likedStored = localStorage.getItem(likedKey);
      const bookmarkedStored = localStorage.getItem(bookmarkedKey);
      const likeCountStored = localStorage.getItem(likeCountKey);
      const bookmarkCountStored = localStorage.getItem(bookmarkCountKey);
      if (likedStored) {
        setLiked(true);
      }
      if (bookmarkedStored) {
        setBookmarked(true);
      }
      if (likeCountStored && !isNaN(Number(likeCountStored))) {
        setLikeCount(Number(likeCountStored));
      }
      if (bookmarkCountStored && !isNaN(Number(bookmarkCountStored))) {
        setBookmarkCount(Number(bookmarkCountStored));
      }
    } catch (err) {
      // ignore errors reading localStorage
    }
  }, [post.id]);

  function handleLike() {
    try {
      const likedKey = `fanspot-liked-${post.id}`;
      const likeCountKey = `fanspot-like-count-${post.id}`;
      if (liked) {
        // Toggle off like
        localStorage.removeItem(likedKey);
        const newCount = Math.max(0, likeCount - 1);
        localStorage.setItem(likeCountKey, newCount.toString());
        setLiked(false);
        setLikeCount(newCount);
      } else {
        localStorage.setItem(likedKey, 'true');
        const newCount = likeCount + 1;
        localStorage.setItem(likeCountKey, newCount.toString());
        setLiked(true);
        setLikeCount(newCount);
      }
    } catch (err) {
      setLiked(!liked);
      // Fallback update when localStorage is unavailable
      setLikeCount((count) => (liked ? Math.max(0, count - 1) : count + 1));
    }
  }

  function handleBookmark() {
    try {
      const bookmarkedKey = `fanspot-bookmarked-${post.id}`;
      const bookmarkCountKey = `fanspot-bookmark-count-${post.id}`;
      if (bookmarked) {
        localStorage.removeItem(bookmarkedKey);
        const newCount = Math.max(0, bookmarkCount - 1);
        localStorage.setItem(bookmarkCountKey, newCount.toString());
        setBookmarked(false);
        setBookmarkCount(newCount);
      } else {
        localStorage.setItem(bookmarkedKey, 'true');
        const newCount = bookmarkCount + 1;
        localStorage.setItem(bookmarkCountKey, newCount.toString());
        setBookmarked(true);
        setBookmarkCount(newCount);
      }
    } catch (err) {
      setBookmarked(!bookmarked);
      // Fallback update when localStorage is unavailable
      setBookmarkCount((count) => (bookmarked ? Math.max(0, count - 1) : count + 1));
    }
  }

  function handleMore() {
    alert("More actions like share and report will be added soon.");
  }

  function handleComment() {
    const comment = prompt('Enter your comment:');
    if (comment) {
      alert('Your comment has been submitted and will appear once comments are implemented.');
    }
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
