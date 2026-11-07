import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

let _db: DrizzleDb | null = null;
let _client: ReturnType<typeof postgres> | null = null;

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

export function getDb(): DrizzleDb {
  if (!_db) {
    const rawUrl = process.env.DATABASE_URL;
    if (!rawUrl) {
      throw new Error("DATABASE_URL environment variable is missing or empty.");
    }
    const connectionString = sanitizeConnectionString(rawUrl);
    _client = postgres(connectionString, {
      prepare: false,
      ssl: "require",
      max: 1,
    });
    _db = drizzle(_client, { schema });
  }
  return _db;
}

// Lazy proxy that forwards calls to getDb() while preserving full TypeScript schema types
export const db = new Proxy({} as DrizzleDb, {
  get(_target, prop) {
    const instance = getDb();
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

export const client = new Proxy({} as ReturnType<typeof postgres>, {
  get(_target, prop) {
    if (!_client) getDb();
    const value = (_client as any)[prop];
    return typeof value === 'function' ? value.bind(_client) : value;
  },
});
