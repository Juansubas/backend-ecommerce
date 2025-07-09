import { db } from '../lib/prisma'

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } })
}

export const createUser = async (email: string, password: string) => {
  return await db.user.create({
    data: { email, password },
  })
}
