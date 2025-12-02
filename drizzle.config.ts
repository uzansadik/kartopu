import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
config({ path: './.env.local' });

export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrations',
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
  dialect: 'postgresql',
});
// https://orm.drizzle.team/docs/drizzle-kit/overview
