import { env } from "@/lib/env";
import { hashString } from "@/lib/utils";

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RateLimitEntry {
  timestamps: number[];
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60_000,
  maxRequests: 10,
};

export function checkRateLimit(
  identifier: string,
  route: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): boolean {
  const key = `rl:${route}:${hashString(identifier, env.RATE_LIMIT_SECRET)}`;

  try {
    const store: Record<string, RateLimitEntry> =
      (globalThis as Record<string, unknown>).__rlStore as Record<string, RateLimitEntry> ?? {};
    if (Object.keys(store).length === 0) return true;

    const entry = store[key] ?? { timestamps: [] };
    const now = Date.now();
    const windowStart = now - config.windowMs;
    const recent = entry.timestamps.filter((t) => t > windowStart);

    if (recent.length >= config.maxRequests) {
      return false;
    }

    recent.push(now);
    store[key] = { timestamps: recent };
    (globalThis as Record<string, unknown>).__rlStore = store;
    return true;
  } catch {
    return true;
  }
}

export function getIpFromHeaders(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
