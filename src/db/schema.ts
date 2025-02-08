import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const eventTable = pgTable("event", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),

  created_at: timestamp().notNull().defaultNow(),

  eventTime: timestamp().notNull().defaultNow(),

  publisher: varchar({ length: 255 }).notNull(),
});