import { sign, verify } from 'hono/jwt'
import { UserJwtPayload } from '../types/auth'

const secret = process.env.JWT_SECRET || 'superSecret'

export const signJwt = async ({ sub, email }: UserJwtPayload): Promise<string> => {
  return await sign({ sub, email }, secret)
}

export const verifyJwt = async (token: string): Promise<UserJwtPayload> => {
  return await verify(token, secret) as UserJwtPayload
}
