import { Hono } from 'hono'
import { AppContext } from '../types/context' // ajusta la ruta si está en otro lado
import { authMiddleware } from '../middlewares/auth.middleware'

const userRoutes = new Hono<AppContext>()

userRoutes.use('*', authMiddleware)

userRoutes.get('/me', (c) => {
  const user = c.get('user') // ✅ sin error de tipo ahora
  return c.json({ user })
})

export default userRoutes
