import { db } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import { signJwt } from '../lib/jwt'

export const register = async ({ email, password }: { email: string; password: string }) => {
  const exists = await db.user.findUnique({ where: { email } })
  if (exists) throw new Error('User already exists')

  const hash = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: { email, password: hash },
  })

  return { id: user.id, email: user.email }
}

export const login = async ({ email, password }: { email: string; password: string }) => {
  const user = await db.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid credentials')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Invalid credentials')

  const token = await signJwt({ sub: user.id })
  return token
}
