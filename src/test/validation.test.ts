import { describe, expect, it } from "vitest";
import { waitlistRequestSchema } from "@/lib/validation/waitlist";

describe("waitlistRequestSchema", () => {
  it("accepts valid email", () => {
    const result = waitlistRequestSchema.safeParse({
      email: "user@example.com",
      source: "hero",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });

  it("trims and lowercases email", () => {
    const result = waitlistRequestSchema.safeParse({
      email: "  User@Example.COM  ",
      source: "waitlist",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });

  it("rejects invalid email", () => {
    const result = waitlistRequestSchema.safeParse({
      email: "not-an-email",
      source: "hero",
    });
    expect(result.success).toBe(false);
  });

  it("rejects email exceeding 254 chars", () => {
    const longEmail = "a".repeat(250) + "@example.com";
    const result = waitlistRequestSchema.safeParse({
      email: longEmail,
      source: "hero",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid source enum", () => {
    const result = waitlistRequestSchema.safeParse({
      email: "test@test.com",
      source: "agora",
    });
    expect(result.success).toBe(true);
  });

  it("defaults source to unknown", () => {
    const result = waitlistRequestSchema.safeParse({
      email: "test@test.com",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.source).toBe("unknown");
    }
  });

  it("accepts optional honeypot", () => {
    const result = waitlistRequestSchema.safeParse({
      email: "test@test.com",
      company: "",
    });
    expect(result.success).toBe(true);
  });
});
