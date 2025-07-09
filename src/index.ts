import { serve } from '@hono/node-server'
import 'dotenv/config'
import app from './app'

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000 ;

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`🚀 Server running at http://localhost:${info.port}`)
})
