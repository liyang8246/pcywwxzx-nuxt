import { db, schema } from '@nuxthub/db';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  requireManagerAuth(event);

  return await db.select().from(schema.issues).orderBy(desc(schema.issues.app_time), desc(schema.issues.id)).limit(32);
});
