import { db, schema } from '@nuxthub/db';

function getIssueWorkdayCount(issueDates) {
  if (!issueDates.length) {
    return 0;
  }

  const weeks = new Set();
  const timestamps = [];

  issueDates.forEach((value) => {
    const date = new Date(Number(value));
    timestamps.push(date.getTime());

    const dayOfWeek = date.getUTCDay();
    const diffToMonday = date.getUTCDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    date.setUTCDate(diffToMonday);
    weeks.add(date.toISOString().slice(0, 10));
  });

  const latestDate = new Date(Math.max(...timestamps));
  const latestWeekday = latestDate.getUTCDay();
  const workdayInWeek = latestWeekday === 0 ? 5 : Math.min(latestWeekday, 5);

  return (weeks.size - 1) * 5 + workdayInWeek;
}

export default defineEventHandler(async () => {
  const issueDates = await db.select({ app_time: schema.issues.app_time }).from(schema.issues);

  return {
    total: issueDates.length,
    workdayCount: getIssueWorkdayCount(issueDates.map((issue) => issue.app_time)),
  };
});
