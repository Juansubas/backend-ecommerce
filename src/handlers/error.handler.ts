import { Context } from 'hono'

export const handleError = (err: unknown, c: Context) => {
  if (err instanceof Error) {
    console.error(err)
    return c.json({ error: err.message }, 500)
  }
  return c.json({ error: 'Unexpected error' }, 500)
}
