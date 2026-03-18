import { bigint, boolean, pgTable, text } from 'drizzle-orm/pg-core';

export const issues = pgTable('issues', {
  id: bigint('id', { mode: 'number' }).generatedByDefaultAsIdentity().primaryKey(),
  uid: text('uid').notNull(),
  name: text('name').notNull(),
  class: text('class').notNull(),
  problem: text('problem').notNull(),
  phone: text('phone').notNull(),
  reg_time: bigint('reg_time', { mode: 'number' }).notNull(),
  app_time: bigint('app_time', { mode: 'number' }).notNull(),
  closed: boolean('closed').notNull().default(false),
  closed_time: bigint('closed_time', { mode: 'number' }),
});
