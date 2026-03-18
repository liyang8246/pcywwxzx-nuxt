import { db, schema } from '@nuxthub/db';
import { createError } from 'h3';

import { getIssueBookingErrorMessage, issueBookingSchema } from '~~/shared/validation/issue-booking';

export default defineEventHandler(async (event) => {
  const parseResult = issueBookingSchema.safeParse(await readBody(event));

  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: getIssueBookingErrorMessage(parseResult.error),
    });
  }

  const [createdIssue] = await db
    .insert(schema.issues)
    .values({
      ...parseResult.data,
      reg_time: Date.now(),
      closed: false,
      closed_time: null,
    })
    .returning();

  setResponseStatus(event, 201);

  return createdIssue ?? null;
});
