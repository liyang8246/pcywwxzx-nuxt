export default defineEventHandler<Promise<string>>(async (event) => {
  const { passwd, id } = await getQuery(event)
  if (passwd !== useRuntimeConfig().manager_passwd) {
    throw createError({ statusCode: 403, statusMessage: '密码错误' })
  }
  const { PrismaClient } = await import('@prisma/client')
  const { withAccelerate } = await import('@prisma/extension-accelerate')
  const prisma = new PrismaClient().$extends(withAccelerate());
  await prisma.issue.delete({
    where: { id: parseInt(id as string) }
  })
  return '删除成功'
})