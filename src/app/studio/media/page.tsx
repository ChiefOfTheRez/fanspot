import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { MediaUploadDropzone } from "@/components/MediaUploadDropzone";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { StudioNav } from "@/components/StudioNav";

export default function StudioMediaPage() {
  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Creator Studio" title="Media library" description="Upload, organize, review, and attach media to posts. S3 and moderation hooks are scaffolded." />
        <StudioNav active="/studio/media" />
        <MediaUploadDropzone />
        <div className="grid gap-4 md:grid-cols-3">{["Awaiting review", "Approved", "Needs changes"].map((status) => <Card key={status}><Badge>{status}</Badge><div className="mt-4 aspect-video rounded-3xl border border-slate-800 bg-white/[0.03]" /><p className="mt-3 text-sm text-slate-400">Media item</p></Card>)}</div>
      </div>
    </Shell>
  );
}
