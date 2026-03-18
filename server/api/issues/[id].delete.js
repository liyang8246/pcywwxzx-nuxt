import { db, schema } from '@nuxthub/db';
import { eq } from 'drizzle-orm';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  requireManagerAuth(event);

  const issueId = Number(getRouterParam(event, 'id'));

  if (!Number.isInteger(issueId)) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: '无效的预约编号' });
  }

  const [deletedIssue] = await db.delete(schema.issues).where(eq(schema.issues.id, issueId)).returning();

  if (!deletedIssue) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: '预约不存在' });
  }

  setResponseStatus(event, 204);
  return null;
});
