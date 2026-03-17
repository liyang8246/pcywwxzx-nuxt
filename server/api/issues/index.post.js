import { db, schema } from '@nuxthub/db';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const payload = {
    uid: typeof body?.uid === 'string' ? body.uid.trim() : '',
    name: typeof body?.name === 'string' ? body.name.trim() : '',
    class: typeof body?.class === 'string' ? body.class.trim() : '',
    problem: typeof body?.problem === 'string' ? body.problem.trim() : '',
    phone: typeof body?.phone === 'string' ? body.phone.trim() : '',
  };
  const appTime = Number(body?.app_time);

  if (Object.values(payload).some((value) => !value)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '请求参数不完整',
    });
  }

  if (!Number.isInteger(appTime) || appTime <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'app_time 必须是有效时间戳',
    });
  }

  const [createdIssue] = await db
    .insert(schema.issues)
    .values({
      ...payload,
      reg_time: Date.now(),
      app_time: appTime,
      closed: false,
      closed_time: null,
    })
    .returning();

  setResponseStatus(event, 201);

  return createdIssue ?? null;
});
