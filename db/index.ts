import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

function sanitizeConnectionString(raw: string): string {
  let str = raw.trim();
  // Strip variable assignment syntax if user accidentally pasted "DATABASE_URL=..."
  str = str.replace(/^DATABASE_URL\s*=\s*/i, '');
  // Strip surrounding quotes if wrapped in "..." or '...'
  str = str.replace(/^["']|["']$/g, '').trim();
  str = str.replace(/^DATABASE_URL\s*=\s*/i, '').trim();
  str = str.replace(/^["']|["']$/g, '').trim();
  return str;
}

export function createScopedDb(connectTimeoutSeconds = 8) {
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) {
    throw new Error("DATABASE_URL environment variable is missing or empty.");
  }
  const connectionString = sanitizeConnectionString(rawUrl);
  const client = postgres(connectionString, {
    prepare: false,
    ssl: 'require',
    max: 1,
    connect_timeout: connectTimeoutSeconds,
    idle_timeout: 0,
  });
  const db = drizzle(client, { schema });
  return {
    db,
    client,
    async close() {
      try {
        await client.end({ timeout: 0 }).catch(() => {});
      } catch {
        // Disregard closing errors in serverless cleanup
      }
    },
  };
}

/**
 * Executes a scoped database operation and guarantees TCP socket cleanup.
 * Essential for Cloudflare Workers / Serverless to prevent isolate hangs
 * and "Cannot perform I/O on behalf of a different request" errors.
 */
export async function withDb<T>(
  fn: (db: DrizzleDb, client: ReturnType<typeof postgres>) => Promise<T>,
  options?: { retries?: number; connectTimeoutSeconds?: number }
): Promise<T> {
  const maxRetries = options?.retries ?? 1;
  const timeoutSec = options?.connectTimeoutSeconds ?? 8;
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const scoped = createScopedDb(timeoutSec);
    try {
      return await fn(scoped.db, scoped.client);
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 250));
      }
    } finally {
      await scoped.close();
    }
  }
  throw lastError;
}

// Fallback legacy accessors
export function getDb(): DrizzleDb {
  return createScopedDb().db;
}

export const db = new Proxy({} as DrizzleDb, {
  get(_target, prop) {
    const instance = getDb();
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

export const client = new Proxy({} as ReturnType<typeof postgres>, {
  get(_target, prop) {
    const scoped = createScopedDb();
    const value = (scoped.client as any)[prop];
    return typeof value === 'function' ? value.bind(scoped.client) : value;
  },
});
