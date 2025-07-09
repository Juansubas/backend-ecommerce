import { db } from '../lib/prisma'

export const findProductsByIds = async (ids: string[]) => {
  return await db.product.findMany({
    where: { id: { in: ids } },
  })
}

export const createOrder = async (
  userId: string,
  total: number,
  items: { productId: string; quantity: number; price: number }[]
) => {
  return await db.order.create({
    data: {
      userId,
      total,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          subtotal: item.quantity * item.price,
        })),
      },
    },
    include: { items: true },
  })
}

export const findOrdersByUser = async (userId: string) => {
  return await db.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  })
}
