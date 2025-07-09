import { Context } from 'hono'
import * as AuthService from '../services/auth.service'

export const register = async (c: Context) => {
  const body = await c.req.json()
  const user = await AuthService.register(body)
  return c.json(user, 201)
}

export const login = async (c: Context) => {
  const body = await c.req.json()
  const token = await AuthService.login(body)
  return c.json({ token }, 200)
}
