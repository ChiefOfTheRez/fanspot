export const uploadPolicy = {
  maxImageBytes: 10 * 1024 * 1024,
  maxVideoBytes: 250 * 1024 * 1024,
  allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedVideoTypes: ["video/mp4", "video/webm"],
  forbidden: [
    "illegal content",
    "non-consensual content",
    "harassment",
    "impersonation",
    "copyright infringement",
    "dangerous activity instructions",
    "minor safety violations"
  ]
};

export function validateUploadInput(input: { mimeType: string; sizeBytes: number }) {
  const allowedTypes = [...uploadPolicy.allowedImageTypes, ...uploadPolicy.allowedVideoTypes];
  if (!allowedTypes.includes(input.mimeType)) {
    return { ok: false, reason: "File type is not supported for the MVP." };
  }
  const limit = input.mimeType.startsWith("video/") ? uploadPolicy.maxVideoBytes : uploadPolicy.maxImageBytes;
  if (input.sizeBytes > limit) {
    return { ok: false, reason: "File is larger than the MVP upload limit." };
  }
  return { ok: true, reason: "Upload accepted for review." };
}

export function shouldEscalateReport(reason: string) {
  return ["IMPERSONATION", "UNSAFE_CONTENT", "COPYRIGHT"].includes(reason.toUpperCase());
}
