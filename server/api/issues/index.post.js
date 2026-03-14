import { db, schema } from '@nuxthub/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const [createdIssue] = await db
    .insert(schema.issues)
    .values({
      uid: body.uid,
      name: body.name,
      class: body.class,
      problem: body.problem,
      phone: body.phone,
      reg_time: Date.now(),
      app_time: body.app_time,
      closed: Boolean(body.closed),
    })
    .returning();

  setResponseStatus(event, 201);

  return createdIssue ?? null;
});
