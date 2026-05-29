"use client";

import Link from "next/link";
import { Bookmark, Flag, Heart, MessageCircle, MoreHorizontal, Send, Share2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { Card } from "@/components/Card";
import type { FeedPost } from "@/lib/mock-data";
import { formatCompact } from "@/lib/format";

type SavedComment = { id: string; body: string; createdAt: string; author: string };

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in the test build.
  }
}

export function FeedPostCard({ post }: { post: FeedPost }) {
  const [likeCount, setLikeCount] = useState(post.likes);
  const [bookmarkCount, setBookmarkCount] = useState(post.bookmarks);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState<SavedComment[]>([]);
  const [commentDraft, setCommentDraft] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [notice, setNotice] = useState("");
  const [hidden, setHidden] = useState(false);

  const commentsKey = `fanspot-comments-${post.id}`;
  const likedKey = `fanspot-liked-${post.id}`;
  const bookmarkedKey = `fanspot-bookmarked-${post.id}`;
  const likeCountKey = `fanspot-like-count-${post.id}`;
  const bookmarkCountKey = `fanspot-bookmark-count-${post.id}`;
  const hiddenKey = `fanspot-hidden-post-${post.id}`;

  useEffect(() => {
    try {
      const likeCountStored = localStorage.getItem(likeCountKey);
      const bookmarkCountStored = localStorage.getItem(bookmarkCountKey);
      setLiked(localStorage.getItem(likedKey) === "true");
      setBookmarked(localStorage.getItem(bookmarkedKey) === "true");
      setHidden(localStorage.getItem(hiddenKey) === "true");
      if (likeCountStored && !Number.isNaN(Number(likeCountStored))) setLikeCount(Number(likeCountStored));
      if (bookmarkCountStored && !Number.isNaN(Number(bookmarkCountStored))) setBookmarkCount(Number(bookmarkCountStored));
      setComments(readJson<SavedComment[]>(commentsKey, []));
    } catch {
      // Ignore localStorage errors.
    }
  }, [commentsKey, hiddenKey, likeCountKey, bookmarkCountKey, likedKey, bookmarkedKey]);

  const totalComments = useMemo(() => post.comments + comments.length, [post.comments, comments.length]);

  function saveBookmarkIds(nextBookmarked: boolean) {
    const ids = readJson<string[]>("fanspot-bookmarked-ids", []);
    const nextIds = nextBookmarked ? Array.from(new Set([...ids, post.id])) : ids.filter((id) => id !== post.id);
    writeJson("fanspot-bookmarked-ids", nextIds);
  }

  function handleLike() {
    const nextLiked = !liked;
    const nextCount = nextLiked ? likeCount + 1 : Math.max(0, likeCount - 1);
    setLiked(nextLiked);
    setLikeCount(nextCount);
    try {
      if (nextLiked) localStorage.setItem(likedKey, "true");
      else localStorage.removeItem(likedKey);
      localStorage.setItem(likeCountKey, String(nextCount));
    } catch {
      // Ignore storage errors.
    }
  }

  function handleBookmark() {
    const nextBookmarked = !bookmarked;
    const nextCount = nextBookmarked ? bookmarkCount + 1 : Math.max(0, bookmarkCount - 1);
    setBookmarked(nextBookmarked);
    setBookmarkCount(nextCount);
    try {
      if (nextBookmarked) localStorage.setItem(bookmarkedKey, "true");
      else localStorage.removeItem(bookmarkedKey);
      localStorage.setItem(bookmarkCountKey, String(nextCount));
      saveBookmarkIds(nextBookmarked);
      window.dispatchEvent(new Event("fanspot-bookmarks-updated"));
    } catch {
      // Ignore storage errors.
    }
  }

  function submitComment() {
    const body = commentDraft.trim();
    if (!body) return;
    const nextComment: SavedComment = {
      id: uid(),
      body,
      author: "You",
      createdAt: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
    };
    const nextComments = [...comments, nextComment];
    setComments(nextComments);
    setCommentDraft("");
    writeJson(commentsKey, nextComments);
  }

  async function sharePost() {
    const url = `${window.location.origin}/post/${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setNotice("Post link copied.");
    } catch {
      setNotice(url);
    }
    setMenuOpen(false);
  }

  function submitReport() {
    const reports = readJson<Array<{ id: string; postId: string; reason: string; createdAt: string }>>("fanspot-post-reports", []);
    const reason = reportReason.trim() || "No reason provided";
    writeJson("fanspot-post-reports", [...reports, { id: uid(), postId: post.id, reason, createdAt: new Date().toISOString() }]);
    setReportReason("");
    setReportOpen(false);
    setMenuOpen(false);
    setNotice("Report sent to the moderation queue.");
  }

  function hidePost() {
    setHidden(true);
    try {
      localStorage.setItem(hiddenKey, "true");
    } catch {
      // Ignore storage errors.
    }
  }

  if (hidden) return null;

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
        <div className="relative">
          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-full p-2 text-slate-500 hover:bg-white/5 hover:text-white" aria-label="More actions">
            <MoreHorizontal className="h-5 w-5" />
          </button>
          {menuOpen ? (
            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40">
              <button onClick={() => void sharePost()} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5"><Share2 className="h-4 w-4" /> Share / copy link</button>
              <button onClick={() => setReportOpen(true)} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5"><Flag className="h-4 w-4" /> Report post</button>
              <button onClick={hidePost} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5"><X className="h-4 w-4" /> Hide post</button>
            </div>
          ) : null}
        </div>
      </div>

      <Link href={`/post/${post.id}`} className="mt-5 block text-xl font-black text-white hover:text-blue-200">{post.title}</Link>
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
        <button onClick={handleLike} className="flex items-center gap-2 hover:text-white" aria-pressed={liked}>
          <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          {formatCompact(likeCount)}
        </button>
        <a href={`#comment-${post.id}`} className="flex items-center gap-2 hover:text-white">
          <MessageCircle className="h-4 w-4" />{formatCompact(totalComments)}
        </a>
        <button onClick={handleBookmark} className="flex items-center gap-2 hover:text-white" aria-pressed={bookmarked}>
          <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-blue-300 text-blue-300" : ""}`} />
          {formatCompact(bookmarkCount)}
        </button>
      </div>

      {notice ? <p className="mt-3 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">{notice}</p> : null}

      {reportOpen ? (
        <div className="mt-4 rounded-2xl border border-slate-800 bg-white/[0.03] p-4">
          <p className="text-sm font-black text-white">Report this post</p>
          <textarea value={reportReason} onChange={(event) => setReportReason(event.target.value)} placeholder="Tell us what is wrong..." className="mt-3 min-h-24 w-full resize-none rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500" />
          <div className="mt-3 flex gap-2">
            <button onClick={submitReport} className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-500">Send report</button>
            <button onClick={() => setReportOpen(false)} className="rounded-2xl border border-slate-800 px-4 py-2 text-sm font-black text-white hover:bg-white/5">Cancel</button>
          </div>
        </div>
      ) : null}

      <div id={`comment-${post.id}`} className="mt-5 rounded-2xl border border-slate-800 bg-black/20 p-4">
        <p className="text-sm font-black text-white">Comments</p>
        <div className="mt-3 space-y-3">
          {comments.length ? comments.map((comment) => (
            <div key={comment.id} className="rounded-2xl bg-white/[0.04] p-3">
              <p className="text-xs font-bold text-blue-200">{comment.author} <span className="font-normal text-slate-500">{comment.createdAt}</span></p>
              <p className="mt-1 text-sm text-slate-200">{comment.body}</p>
            </div>
          )) : <p className="text-sm text-slate-500">No local comments yet.</p>}
        </div>
        <div className="mt-4 flex gap-2">
          <input value={commentDraft} onChange={(event) => setCommentDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") submitComment(); }} placeholder="Write a comment..." className="min-w-0 flex-1 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500" />
          <button onClick={submitComment} className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-500" aria-label="Send comment"><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </Card>
  );
}
