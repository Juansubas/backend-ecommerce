import { MiddlewareHandler } from 'hono'
import { verifyJwt } from '../lib/jwt'
import { UserJwtPayload } from '../types/auth'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload : UserJwtPayload = await verifyJwt(token)
    c.set('user', payload)
    console.log(payload)
    await next()
  } catch {
    return c.json({ error: 'Invalid token' }, 401)
  }
}
