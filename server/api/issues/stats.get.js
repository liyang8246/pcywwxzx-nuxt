import { db, schema } from '@nuxthub/db';
import { count } from 'drizzle-orm';

function getIssueWorkdayCount(issueDates) {
  if (!issueDates.length) {
    return 0;
  }

  const weeks = new Set();
  const timestamps = [];

  issueDates.forEach((value) => {
    const date = new Date(Number(value));
    timestamps.push(date.getTime());

    const dayOfWeek = date.getDay();
    const diffToMonday = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    date.setDate(diffToMonday);
    weeks.add(date.toISOString().split('T')[0]);
  });

  const latestDate = new Date(Math.max(...timestamps));
  const latestWeekday = latestDate.getDay();
  const workdayInWeek = latestWeekday === 0 ? 5 : Math.min(latestWeekday, 5);

  return (weeks.size - 1) * 5 + workdayInWeek;
}

export default defineEventHandler(async () => {
  const [issueCount] = await db.select({ total: count(schema.issues.id) }).from(schema.issues);
  const issueDates = await db.select({ app_time: schema.issues.app_time }).from(schema.issues);

  return {
    total: Number(issueCount?.total ?? 0),
    workdayCount: getIssueWorkdayCount(issueDates.map((issue) => issue.app_time)),
  };
});
