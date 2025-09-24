function bigintToString(obj: any) {
  if (Array.isArray(obj)) {
    return obj.map(bigintToString)
  } else if (obj && typeof obj === 'object') {
    const res: any = {}
    for (const key in obj) {
      const val = obj[key]
      res[key] = typeof val === 'bigint' ? val.toString() : bigintToString(val)
    }
    return res
  }
  return obj
}

export default defineEventHandler(async () => {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const { withAccelerate } = await import('@prisma/extension-accelerate')
    const prisma = new PrismaClient().$extends(withAccelerate());
    const issues = await prisma.$queryRaw`
      SELECT app_time FROM issues WHERE app_time IS NOT NULL
    `
    const issuesTyped = bigintToString(issues) as { app_time: string }[]
    // 转换和过滤日期
    let dateList = issuesTyped
      .map(item => {
        // 确保 app_time 是有效的数字字符串
        if (!item.app_time || isNaN(Number(item.app_time))) return null;
        return new Date(Number(item.app_time));
      })
      .filter(date => date && !isNaN(date.getTime())); // 过滤掉无效的 Date 对象

    // ... 剩余的周一计算和返回逻辑
    let weeks = new Set<string>();
    dateList.forEach(date => {
      if (!date) return;
      const dayOfWeek = date.getDay();
      const diffToMonday = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      // 为避免修改原日期，创建一个新的 Date 对象进行操作
      const monday = new Date(date);
      monday.setDate(diffToMonday);
      weeks.add(monday.toISOString().split('T')[0]);
    });

    const weeksArr = Array.from(weeks);
    if (weeksArr.length === 0) {
      return 0; // 如果没有有效的周一，返回0
    }
    const lastWeekDay = new Date(weeksArr[weeksArr.length - 1]).getDay();
    return (weeksArr.length - 1) * 5 - lastWeekDay;
  } catch (e) {
    console.error('Error in date_num API:', e);
    return 0;
  }
})