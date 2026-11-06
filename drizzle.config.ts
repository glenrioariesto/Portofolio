import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // Only manage this app's tables; ignore Nile built-ins (e.g. `tenants`).
  tablesFilter: ["bookings", "career_salaries"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
