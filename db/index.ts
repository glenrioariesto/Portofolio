import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

let _db: DrizzleDb | null = null;
let _client: ReturnType<typeof postgres> | null = null;

export function getDb(): DrizzleDb {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is missing or empty.");
    }
    _client = postgres(connectionString, {
      prepare: false,
      ssl: "require",
      max: 1,
      idle_timeout: 20,
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
