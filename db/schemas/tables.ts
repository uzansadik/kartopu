import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const profile = pgTable('profile', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  username: text('username').notNull().unique(),
  phoneNumber: text('phone_number').unique(),
  website: text('website').unique(),
  xUrl: text('x_url').unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
