import { db, schema } from '@nuxthub/db';
import { eq } from 'drizzle-orm';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  requireManagerAuth(event);

  const issueId = Number(getRouterParam(event, 'id'));
  const body = await readBody(event);

  if (!Number.isInteger(issueId)) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: '无效的预约编号' });
  }

  if (typeof body?.closed !== 'boolean') {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'closed 必须是布尔值' });
  }

  const [updatedIssue] = await db
    .update(schema.issues)
    .set({
      closed: body.closed,
      closed_time: body.closed ? Date.now() : null,
    })
    .where(eq(schema.issues.id, issueId))
    .returning();

  if (!updatedIssue) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: '预约不存在' });
  }

  return updatedIssue;
});
