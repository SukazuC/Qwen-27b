import { getDatabaseUrl, isServerEnvAvailable } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let db: ReturnType<typeof drizzle> | undefined;

export function getDb() {
  if (!isServerEnvAvailable()) {
    console.warn("⚠️  DATABASE_URL not set — database operations unavailable.");
    return null;
  }

  if (!db) {
    const url = getDatabaseUrl()!;
    const client = postgres(url, { max: 1 });
    db = drizzle(client);
  }
  return db;
}

export function isDbAvailable(): boolean {
  return isServerEnvAvailable();
}
