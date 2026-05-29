import { ImagePlus, UploadCloud } from "lucide-react";
import { Card } from "@/components/Card";

export function MediaUploadDropzone() {
  return (
    <Card className="border-dashed border-slate-700 bg-white/[0.025] text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-blue-600/20 text-blue-200">
        <UploadCloud className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-black text-white">Upload media for review</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">FanSpot section for S3 presigned uploads. Files should go through validation, malware scanning, and moderation before publishing.</p>
      <button className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500">
        <ImagePlus className="h-4 w-4" /> Choose files
      </button>
    </Card>
  );
}
