import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async () => {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const { withAccelerate } = await import('@prisma/extension-accelerate')
    const prisma = new PrismaClient().$extends(withAccelerate())
    const count = await prisma.issue.count()
    console.log('Issue count:', count)
    return count
  } catch (e) {
    console.error('Error counting issues:', e)
    return 0
  }
})