import { z } from "zod";

export const waitlistRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Adresse email invalide.")
    .max(254, "Adresse email trop longue."),
  source: z
    .enum(["hero", "waitlist", "footer", "agora", "unknown"])
    .default("unknown"),
  referralCode: z.string().trim().max(32).optional(),
  company: z.string().optional(),
});

export type WaitlistRequest = z.infer<typeof waitlistRequestSchema>;

export const waitlistResponseSchema = z.discriminatedUnion("ok", [
  z.object({
    ok: z.literal(true),
    status: z.enum(["created", "duplicate"]),
    founderId: z.string(),
    points: z.number(),
    emailWarning: z.boolean().optional(),
  }),
  z.object({
    ok: z.literal(false),
    error: z.string(),
    message: z.string(),
  }),
]);

export type WaitlistResponse = z.infer<typeof waitlistResponseSchema>;
