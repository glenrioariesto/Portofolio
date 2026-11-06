import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" mode
// Nile (serverless Postgres) requires SSL; keep pool small for Workers isolates.
export const client = postgres(connectionString, {
  prepare: false,
  ssl: "require",
  max: 1,
  idle_timeout: 20,
});
export const db = drizzle(client, { schema });
