const blockedTerms = ["spam-link-placeholder", "impersonation-placeholder"];

export function getModerationHints(text: string) {
  const normalized = text.toLowerCase();
  const hits = blockedTerms.filter((term) => normalized.includes(term));

  return {
    shouldFlag: hits.length > 0,
    hits,
    recommendedStatus: hits.length > 0 ? "FLAGGED" : "PENDING_REVIEW"
  };
}

export function isAllowedUploadMimeType(mimeType: string) {
  return ["image/jpeg", "image/png", "image/webp", "video/mp4"].includes(mimeType);
}
