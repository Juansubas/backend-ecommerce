import { Context } from 'hono'
import * as OrderService from '../services/order.service'
import { OrderInput } from '../types/order'

export const createOrder = async (c: Context) => {
  const user = c.get('user')
  const body = await c.req.json<OrderInput>()
  const order = await OrderService.create(user.sub, body)
  return c.json(order, 201)
}

export const getOrders = async (c: Context) => {
  const user = c.get('user')
  const orders = await OrderService.getAll(user.sub)
  return c.json(orders)
}
