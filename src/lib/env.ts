import { z } from "zod";

export interface EnvConfig {
  DATABASE_URL?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  RATE_LIMIT_SECRET?: string;
  NODE_ENV: string;
}

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  RATE_LIMIT_SECRET: z.string().optional(),
  NODE_ENV: z.string().default("development"),
});

export function loadEnv(): EnvConfig {
  const parsed = envSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    RATE_LIMIT_SECRET: process.env.RATE_LIMIT_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
  });

  if (!parsed.success && process.env.NODE_ENV !== "test") {
    console.warn(
      "⚠️  Environment validation warnings:",
      parsed.error.flatten().fieldErrors
    );
  }

  return parsed.success
    ? parsed.data
    : { NODE_ENV: process.env.NODE_ENV || "development" };
}

const env = loadEnv();

export { env };

export function getDatabaseUrl(): string | undefined {
  return env.DATABASE_URL;
}

export function isServerEnvAvailable(): boolean {
  return !!env.DATABASE_URL;
}
