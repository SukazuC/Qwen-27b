import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const waitlistSignups = pgTable("waitlist_signups", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  normalizedEmail: text("normalized_email").notNull().unique(),
  source: text("source"),
  referralCode: text("referral_code").unique(),
  referredBy: text("referred_by"),
  founderNumber: integer("founder_number").unique(),
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const founders = pgTable("founders", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  displayId: text("display_id").notNull().unique(),
  points: integer("points").default(100),
  joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),
  referralCode: text("referral_code").unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const polls = pgTable("polls", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  status: text("status").notNull(),
  closesAt: timestamp("closes_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const pollOptions = pgTable("poll_options", {
  id: uuid("id").defaultRandom().primaryKey(),
  pollId: uuid("poll_id")
    .notNull()
    .references(() => polls.id),
  slug: text("slug").notNull(),
  label: text("label").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const pollVotes = pgTable("poll_votes", {
  id: uuid("id").defaultRandom().primaryKey(),
  pollId: uuid("poll_id")
    .notNull()
    .references(() => polls.id),
  optionId: uuid("option_id")
    .notNull()
    .references(() => pollOptions.id),
  founderId: uuid("founder_id").references(() => founders.id),
  anonymousTokenHash: text("anonymous_token_hash"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const rateLimitEvents = pgTable("rate_limit_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  route: text("route").notNull(),
  ipHash: text("ip_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
