interface NewIssueBody {
  uid: string
  name: string
  class: string
  problem: string
  phone: string
  app_time: string
  closed: boolean
}

export default defineEventHandler<Promise<string>>(async (event) => {
  const { PrismaClient } = await import('@prisma/client')
  const { withAccelerate } = await import('@prisma/extension-accelerate')
  const prisma = new PrismaClient().$extends(withAccelerate());
  const body = await readBody<NewIssueBody>(event)
  await prisma.issue.create({
    data: {
      uid: body.uid,
      name: body.name,
      class: body.class,
      problem: body.problem,
      phone: body.phone,
      reg_time: BigInt(Date.now()),
      app_time: BigInt(body.app_time),
      closed: body.closed
    }
  })
  return '预约成功!!!'
})