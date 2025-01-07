export default defineEventHandler(async (event) => {
    const db = hubDatabase();
    const issue_num = await db.prepare('SELECT COUNT(id) FROM issue').first();
    return issue_num["COUNT(id)"];
  });