export default defineEventHandler<Promise<string>>(async (event) => {
  const { PrismaClient } = await import('@prisma/client')
  const { withAccelerate } = await import('@prisma/extension-accelerate')
  const prisma = new PrismaClient().$extends(withAccelerate());
  const { passwd, id } = await getQuery(event)
  console.log(passwd, id)
  if (passwd !== useRuntimeConfig().manager_passwd) {
    return '密码错误'
  }

  const issues = await prisma.issue.findUnique({
    where: { id: parseInt(id as string) },
    select: { closed: true }
  })

  if (!issues) {
    return '记录不存在'
  }

  if (issues.closed) {
    await prisma.issue.update({
      where: { id: parseInt(id as string) },
      data: { closed: false }
    })
  } else {
    await prisma.issue.update({
      where: { id: parseInt(id as string) },
      data: {
        closed: true,
        closed_time: BigInt(Date.now())
      }
    })
  }

  return '状态更新成功'
})