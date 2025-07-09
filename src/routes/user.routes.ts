import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth.middleware'
import { getMe } from '../controllers/user.controller'

const userRoutes = new Hono()

userRoutes.use('*', authMiddleware)

userRoutes.get('/me', getMe)

export default userRoutes
