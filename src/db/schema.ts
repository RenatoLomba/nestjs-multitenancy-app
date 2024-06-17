import { sql } from 'drizzle-orm';
import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { UserRoles } from '../auth/users/enums/user-roles';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  roles: jsonb('roles').notNull().$type<UserRoles[]>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const partners = pgTable('partners', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const partnersUsers = pgTable('partners_users', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  partnerId: integer('partner_id')
    .notNull()
    .references(() => partners.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  partnerId: integer('partner_id')
    .notNull()
    .references(() => partners.id),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Partner = typeof partners.$inferSelect;
export type NewPartner = typeof partners.$inferInsert;
export type PartnerUser = typeof partnersUsers.$inferSelect;
export type NewPartnerUser = typeof partnersUsers.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
