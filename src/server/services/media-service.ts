const allowedMimeTypes = new Set(["image/png", "image/jpeg", "image/webp", "video/mp4", "audio/mpeg", "application/pdf"]);
const maxUploadBytes = 50 * 1024 * 1024;

export function validateUploadRequest(mimeType: string, sizeBytes: number) {
  if (!allowedMimeTypes.has(mimeType)) return { ok: false, reason: "Unsupported file type" };
  if (sizeBytes > maxUploadBytes) return { ok: false, reason: "File is too large" };
  return { ok: true, reason: "Accepted" };
}
