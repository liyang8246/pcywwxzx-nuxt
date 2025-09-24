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

export default defineEventHandler(async (event) => {
  const { passwd } = getQuery(event)
  if (passwd !== useRuntimeConfig().manager_passwd) {
    throw createError({ statusCode: 403, statusMessage: '密码错误' })
  }
  const { PrismaClient } = await import('@prisma/client')
  const { withAccelerate } = await import('@prisma/extension-accelerate')
  const prisma = new PrismaClient().$extends(withAccelerate());
  const issue_list = await prisma.$queryRaw`
    SELECT
      id,
      uid,
      name,
      class,
      problem,
      phone,
      reg_time,
      app_time,
      closed,
      closed_time
    FROM issues
    ORDER BY app_time DESC
    LIMIT 32
  `
  return bigintToString(issue_list)
})