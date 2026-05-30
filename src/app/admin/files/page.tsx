import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { AdminNav } from "@/components/AdminNav";
import { feedPosts } from "@/lib/mock-data";

export default function AdminFilesPage() {
  // Group posts by visibility status for display. This helps admins understand which media are public, followers-only, or supporters-only.
  const grouped = feedPosts.reduce<Record<string, typeof feedPosts>>((acc, post) => {
    const key = post.visibility;
    if (!acc[key]) acc[key] = [];
    acc[key].push(post);
    return acc;
  }, {});

  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <PageHero
          eyebrow="Admin"
          title="Media library"
          description="Review all uploaded media assets. This lists every post with its visibility status. Future versions will integrate S3/DB storage and moderation workflows."
        />
        <AdminNav active="/admin/files" />
        {/* Display media grouped by visibility. Each group shows all posts with a visibility status. */}
        {Object.entries(grouped).map(([visibility, posts]) => (
          <div key={visibility} className="space-y-4">
            <h3 className="text-lg font-bold text-white capitalize">{visibility.toLowerCase()} media</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id}>
                  <Badge>{visibility}</Badge>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-white">{post.title}</p>
                    <p className="text-xs text-slate-400">By {post.author}</p>
                  </div>
                  {/* Placeholder media preview. In a real implementation, this would display the uploaded image or video. */}
                  <div className="mt-3 aspect-video rounded-3xl border border-slate-800 bg-white/[0.03] flex items-center justify-center text-xs text-slate-500">
                    {post.mediaLabel ?? "No media"}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Post ID: {post.id}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}