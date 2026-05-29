import { Bookmark } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { FeedPostCard } from "@/components/FeedPostCard";
import { PageHero } from "@/components/PageHero";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { feedPosts } from "@/lib/mock-data";

export default function BookmarksPage() {
  return (
    <Shell active="/bookmarks" rightRail={<RightRail />}>
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Saved" title="Bookmarked posts" description="Saved posts will appear here.">
          <p className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm font-bold text-white"><Bookmark className="h-4 w-4" /> {feedPosts.length} saves</p>
        </PageHero>
        {feedPosts.length ? feedPosts.map((post) => <FeedPostCard key={post.id} post={post} />) : <EmptyState icon={<Bookmark className="h-10 w-10" />} title="No bookmarks yet" description="Save posts soon and they will show up here." />}
      </div>
    </Shell>
  );
}
