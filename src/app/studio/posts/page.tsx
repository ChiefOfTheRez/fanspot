import { Calendar, Eye, PlusCircle } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { FeedPostCard } from "@/components/FeedPostCard";
import { Shell } from "@/components/Shell";
import { feedPosts } from "@/lib/mock-data";

export default function StudioPostsPage() {
  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <SectionHeader eyebrow="Studio" title="Post manager" description="Manage drafts, scheduled posts, review status, and visibility rules." />
        <div className="grid gap-4 md:grid-cols-3">
          <Card><Badge tone="gray"><PlusCircle className="mr-1 h-3 w-3" /> Drafts</Badge><p className="mt-3 text-3xl font-black">4</p></Card>
          <Card><Badge tone="yellow"><Calendar className="mr-1 h-3 w-3" /> Scheduled</Badge><p className="mt-3 text-3xl font-black">2</p></Card>
          <Card><Badge tone="blue"><Eye className="mr-1 h-3 w-3" /> In review</Badge><p className="mt-3 text-3xl font-black">1</p></Card>
        </div>
        <div className="space-y-5">
          {feedPosts.map((post) => <FeedPostCard key={post.id} post={post} />)}
        </div>
      </div>
    </Shell>
  );
}
