import { Bookmark, FolderPlus, Plus } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { FeedPostCard } from "@/components/FeedPostCard";
import { PageHero } from "@/components/PageHero";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { feedPosts } from "@/lib/mock-data";

const bookmarkGroups = ["Favorites", "Cosplay ideas", "Creator research"];

export default function BookmarksPage() {
  return (
    <Shell active="/bookmarks" rightRail={<RightRail />}>
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Saved" title="Bookmarks" description="Save posts and organize them into custom groups.">
          <p className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm font-bold text-white"><Bookmark className="h-4 w-4" /> {feedPosts.length} saves</p>
        </PageHero>
        <section className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-black text-white">Custom groups</h2>
              <p className="mt-1 text-sm text-slate-400">Temporary MVP control for grouping saved posts. Database-backed groups can be connected later.</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-500">
              <Plus className="h-4 w-4" /> Create group
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {bookmarkGroups.map((group) => (
              <button key={group} className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 px-4 py-2 text-sm font-bold text-slate-200 hover:border-blue-500 hover:text-white">
                <FolderPlus className="h-4 w-4" /> {group}
              </button>
            ))}
          </div>
        </section>
        {feedPosts.length ? feedPosts.map((post) => <FeedPostCard key={post.id} post={post} />) : <EmptyState icon={<Bookmark className="h-10 w-10" />} title="No bookmarks yet" description="Save posts soon and they will show up here." />}
      </div>
    </Shell>
  );
}
