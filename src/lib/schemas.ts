import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/),
  displayName: z.string().min(2).max(80),
  password: z.string().min(10).max(128),
  phoneNumber: z.string().trim().max(30).optional().transform((value) => value || undefined),
  emailMarketingOptIn: z.boolean().optional().default(false)
});

export const messageSchema = z.object({
  receiverId: z.string().min(1),
  body: z.string().min(1).max(2000)
});

export const tierSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(5).max(500),
  priceCents: z.number().int().min(100).max(50000)
});

export const adminDecisionSchema = z.object({
  decision: z.enum(["APPROVE", "REJECT", "REQUEST_INFO", "ESCALATE"]),
  notes: z.string().min(5).max(2000)
});

export const supportTicketSchema = z.object({
  subject: z.string().min(3).max(140),
  body: z.string().min(10).max(4000)
});
