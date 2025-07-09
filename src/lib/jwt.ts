import { sign, verify } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types'

const secret = process.env.JWT_SECRET || 'superSecret'

export const signJwt = async (payload: JWTPayload) => {
  return await sign(payload, secret)
}

export const verifyJwt = async (token: string) => {
  return await verify(token, secret)
}
