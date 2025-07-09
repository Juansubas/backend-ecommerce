import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { handleError } from './handlers/error.handler'
import 'dotenv/config'

const app = new Hono()

app.onError(handleError)

app.route('/auth', authRoutes)
app.route('/users', userRoutes)

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`🚀 Server running at http://localhost:${info.port}`)
})
