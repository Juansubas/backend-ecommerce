import { Hono } from 'hono'
import * as AuthController from '../controllers/auth.controller'

const authRoutes = new Hono()

authRoutes.post('/register', AuthController.register)
authRoutes.post('/login', AuthController.login)

export default authRoutes
