import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const eventTable = pgTable("event", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),

  created_at: timestamp().notNull(),

  eventTime : timestamp().notNull(),

  // Todo: fix code
  publisher_id: varchar({length:64}).notNull(),
});

export const userTable = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),

  created_at: timestamp().notNull(),

  email: varchar({ length: 255 }).notNull(),
});