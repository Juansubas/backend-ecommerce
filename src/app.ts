import { Hono } from 'hono'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import productRoutes from './routes/product.routes'
import orderRoutes from './routes/order.routes'
import { handleError } from './handlers/error.handler'
import docsRoute from './routes/docs.route'

const app = new Hono()

app.use('*', async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.path}`)
  return next()
})

app.route('/auth', authRoutes)
app.route('/user', userRoutes)
app.route('/products', productRoutes)
app.route('/orders', orderRoutes)
app.route('/docs', docsRoute)

app.onError(handleError)

export default app
