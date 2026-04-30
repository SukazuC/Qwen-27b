import { getDb } from "./client";
import { waitlistSignups, founders } from "./schema";
import { eq, sql } from "drizzle-orm";

export async function upsertWaitlistSignup(
  email: string,
  normalizedEmail: string,
  source?: string,
  referralCode?: string
): Promise<{ status: "created" | "duplicate"; id: string | null; founderNumber: number | null }> {
  const db = getDb();
  if (!db) {
    return { status: "created", id: null, founderNumber: null };
  }

  const existing = await db
    .select({ id: waitlistSignups.id })
    .from(waitlistSignups)
    .where(eq(waitlistSignups.normalizedEmail, normalizedEmail))
    .limit(1);

  if (existing.length > 0) {
    return { status: "duplicate", id: existing[0].id, founderNumber: null };
  }

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(waitlistSignups);

  const nextNumber = (countResult[0]?.count ?? 0) + 1;

  const result = await db
    .insert(waitlistSignups)
    .values({
      email,
      normalizedEmail,
      source,
      referralCode,
      founderNumber: nextNumber,
      consentAt: new Date(),
    })
    .returning({ id: waitlistSignups.id });

  return { status: "created", id: result[0]?.id ?? null, founderNumber: nextNumber };
}

export async function createFounder(
  email: string,
  founderNumber: number
): Promise<{ displayId: string; referralCode: string }> {
  const displayId = `HYDRE-${String(founderNumber).padStart(4, "0")}`;
  const referralCode = `HYDRE-${founderNumber}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const db = getDb();
  if (!db) {
    return { displayId, referralCode };
  }

  try {
    await db.insert(founders).values({
      email,
      displayId,
      referralCode,
      points: 100,
    });
  } catch {
    // Founder may already exist
  }

  return { displayId, referralCode };
}
