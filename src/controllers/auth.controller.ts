import { Context } from 'hono'
import * as AuthService from '../services/auth.service'
import { AuthRequestBody, AuthResponse } from '../types/auth'

export const register = async (c: Context) => {
  const body = await c.req.json<AuthRequestBody>()
  const user: AuthResponse = await AuthService.register(body)
  return c.json(user, 201)
}

export const login = async (c: Context) => {
  const body = await c.req.json<AuthRequestBody>()
  const token = await AuthService.login(body)
  return c.json({ token }, 200)
}
