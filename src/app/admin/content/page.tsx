import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { FeedPostCard } from "@/components/FeedPostCard";
import { Shell } from "@/components/Shell";
import { feedPosts } from "@/lib/mock-data";

export default function AdminContentPage() {
  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <SectionHeader eyebrow="Admin" title="Content review" description="Review pending posts and media before approval. This is critical before enabling uploads." />
        <Card className="flex flex-wrap gap-2">
          <Badge tone="blue"><Eye className="mr-1 h-3 w-3" /> Pending review</Badge>
          <Badge tone="green"><CheckCircle2 className="mr-1 h-3 w-3" /> Approve</Badge>
          <Badge tone="red"><XCircle className="mr-1 h-3 w-3" /> Remove</Badge>
        </Card>
        <div className="space-y-5">
          {feedPosts.map((post) => <FeedPostCard key={post.id} post={post} />)}
        </div>
      </div>
    </Shell>
  );
}
