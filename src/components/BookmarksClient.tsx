"use client";

import { useEffect, useMemo, useState } from "react";
import { Bookmark, FolderPlus, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { FeedPostCard } from "@/components/FeedPostCard";
import { feedPosts } from "@/lib/mock-data";

type Groups = Record<string, string[]>;

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
    // Ignore storage errors in local demo storage.
  }
}

export function BookmarksClient() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [groups, setGroups] = useState<Groups>({ Favorites: [], "Cosplay ideas": [], "Creator research": [] });
  const [selectedGroup, setSelectedGroup] = useState("All bookmarks");
  const [newGroup, setNewGroup] = useState("");

  function load() {
    setSavedIds(readJson<string[]>("fanspot-bookmarked-ids", []));
    setGroups(readJson<Groups>("fanspot-bookmark-groups", { Favorites: [], "Cosplay ideas": [], "Creator research": [] }));
  }

  useEffect(() => {
    load();
    window.addEventListener("fanspot-bookmarks-updated", load);
    return () => window.removeEventListener("fanspot-bookmarks-updated", load);
  }, []);

  const savedPosts = useMemo(() => feedPosts.filter((post) => savedIds.includes(post.id)), [savedIds]);
  const visibleIds = selectedGroup === "All bookmarks" ? savedIds : groups[selectedGroup] ?? [];
  const visiblePosts = useMemo(() => feedPosts.filter((post) => visibleIds.includes(post.id)), [visibleIds]);

  function createGroup() {
    const name = newGroup.trim();
    if (!name || groups[name]) return;
    const next = { ...groups, [name]: [] };
    setGroups(next);
    writeJson("fanspot-bookmark-groups", next);
    setSelectedGroup(name);
    setNewGroup("");
  }

  function deleteGroup(name: string) {
    const next = { ...groups };
    delete next[name];
    setGroups(next);
    writeJson("fanspot-bookmark-groups", next);
    setSelectedGroup("All bookmarks");
  }

  function togglePostInGroup(postId: string, groupName: string) {
    const current = groups[groupName] ?? [];
    const nextIds = current.includes(postId) ? current.filter((id) => id !== postId) : [...current, postId];
    const next = { ...groups, [groupName]: nextIds };
    setGroups(next);
    writeJson("fanspot-bookmark-groups", next);
  }

  return (
    <div className="space-y-5 pb-24">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-6 md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">Bookmarks</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Save posts and organize them into custom groups.</p>
        <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-300"><Bookmark className="h-4 w-4" /> {savedPosts.length} saved posts</p>
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-black text-white">Custom groups</h2>
            <p className="mt-1 text-sm text-slate-400">Create groups, select a group, then add saved posts to it.</p>
          </div>
          <div className="flex gap-2">
            <input value={newGroup} onChange={(event) => setNewGroup(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") createGroup(); }} placeholder="New group name" className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500" />
            <button onClick={createGroup} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-500">
              <Plus className="h-4 w-4" /> Create
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["All bookmarks", ...Object.keys(groups)].map((group) => (
            <button key={group} onClick={() => setSelectedGroup(group)} className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-bold ${selectedGroup === group ? "border-blue-500 bg-blue-600/20 text-white" : "border-slate-800 text-slate-200 hover:border-blue-500 hover:text-white"}`}>
              <FolderPlus className="h-4 w-4" /> {group}
            </button>
          ))}
          {selectedGroup !== "All bookmarks" ? (
            <button onClick={() => deleteGroup(selectedGroup)} className="inline-flex items-center gap-2 rounded-2xl border border-red-500/30 px-4 py-2 text-sm font-bold text-red-200 hover:bg-red-500/10">
              <Trash2 className="h-4 w-4" /> Delete group
            </button>
          ) : null}
        </div>
      </section>

      {selectedGroup !== "All bookmarks" && savedPosts.length ? (
        <Card>
          <h2 className="text-lg font-black text-white">Add saved posts to “{selectedGroup}”</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {savedPosts.map((post) => {
              const inGroup = (groups[selectedGroup] ?? []).includes(post.id);
              return (
                <button key={post.id} onClick={() => togglePostInGroup(post.id, selectedGroup)} className={`rounded-2xl border px-4 py-2 text-sm font-bold ${inGroup ? "border-blue-500 bg-blue-600/20 text-white" : "border-slate-800 text-slate-300 hover:border-blue-500 hover:text-white"}`}>
                  {inGroup ? "Remove" : "Add"} {post.title}
                </button>
              );
            })}
          </div>
        </Card>
      ) : null}

      <div className="space-y-5">
        {visiblePosts.length ? visiblePosts.map((post) => <FeedPostCard key={post.id} post={post} />) : (
          <EmptyState icon={<Bookmark className="h-10 w-10" />} title="No bookmarks here yet" description={selectedGroup === "All bookmarks" ? "Bookmark posts from the home feed and they will show up here." : "Add saved posts to this custom group."} />
        )}
      </div>
    </div>
  );
}
