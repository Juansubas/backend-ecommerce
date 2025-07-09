import { MiddlewareHandler } from 'hono'
import { verifyJwt } from '../lib/jwt'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = await verifyJwt(token)
    c.set('jwtPayload', payload)
    await next()
  } catch {
    return c.json({ error: 'Invalid token' }, 401)
  }
}
