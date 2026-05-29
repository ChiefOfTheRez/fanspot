import { z } from "zod";

export const creatorApplicationSchema = z.object({
  displayName: z.string().min(2).max(80),
  desiredUsername: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/).optional(),
  category: z.string().min(2).max(60),
  audienceSummary: z.string().min(20).max(1000),
  planSummary: z.string().min(20).max(1000)
});

export const postCreateSchema = z.object({
  title: z.string().max(120).optional(),
  body: z.string().min(1).max(4000),
  visibility: z.enum(["PUBLIC", "FOLLOWERS", "SUPPORTERS"])
});

export const reportCreateSchema = z.object({
  postId: z.string().optional(),
  reason: z.enum([
    "SPAM",
    "HARASSMENT",
    "IMPERSONATION",
    "UNSAFE_CONTENT",
    "PAYMENT_ISSUE",
    "COPYRIGHT",
    "OTHER"
  ]),
  details: z.string().max(2000).optional()
});

export const presignUploadSchema = z.object({
  filename: z.string().min(1).max(200),
  mimeType: z.string().min(3).max(120),
  sizeBytes: z.number().int().positive().max(50 * 1024 * 1024)
});
