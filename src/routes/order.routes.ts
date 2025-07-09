import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth.middleware'
import * as OrderController from '../controllers/order.controller'

const orderRoutes = new Hono()

orderRoutes.use('*', authMiddleware)
orderRoutes.post('/', OrderController.createOrder)
orderRoutes.get('/', OrderController.getOrders)

export default orderRoutes
