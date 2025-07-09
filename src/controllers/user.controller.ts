import { Context } from 'hono'

export const getMe = (c: Context) => {
  const user = c.get('user')
  return c.json({ id: user.sub, email: user.email })
}
