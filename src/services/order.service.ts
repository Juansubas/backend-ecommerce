import * as OrderRepo from '../repositories/order.repository'
import { OrderInput, OrderItemInput } from '../types/order'
import { Order } from '@prisma/client'

export const create = async (userId: string, data: OrderInput): Promise<Order> => {
  const total = data.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )

  return await OrderRepo.createOrder(userId, total, data.items)
}

export const getAll = async (userId: string) => {
  return await OrderRepo.findOrdersByUser(userId)
}
