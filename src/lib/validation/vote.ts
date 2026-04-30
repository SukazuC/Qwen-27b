import { z } from "zod";

export const voteRequestSchema = z.object({
  pollSlug: z.string().trim().min(1, "Identifiant de sondage requis."),
  optionSlug: z.string().trim().min(1, "Option requise."),
  email: z.string().trim().toLowerCase().email().max(254).optional(),
  anonymousToken: z.string().trim().min(16).optional(),
}).refine(
  (data) => data.email || data.anonymousToken,
  { message: "Email ou jeton anonyme requis." }
);

export type VoteRequest = z.infer<typeof voteRequestSchema>;

export const voteResponseSchema = z.discriminatedUnion("ok", [
  z.object({
    ok: z.literal(true),
    status: z.enum(["voted", "already_voted"]),
    pollSlug: z.string(),
    optionSlug: z.string(),
  }),
  z.object({
    ok: z.literal(false),
    error: z.string(),
    message: z.string(),
  }),
]);

export type VoteResponse = z.infer<typeof voteResponseSchema>;
