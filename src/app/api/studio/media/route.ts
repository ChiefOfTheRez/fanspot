import { ok } from "@/lib/api";

export async function GET() {
  return ok({ assets: [], message: "Media library is ready for S3-backed assets." });
}
