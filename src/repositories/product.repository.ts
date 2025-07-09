import { db } from '../lib/prisma'
import { Product } from '@prisma/client'

export const getAll = async (): Promise<Product[]> => {
  return await db.product.findMany()
}

export const getById = async (id: string): Promise<Product | null> => {
  return await db.product.findUnique({ where: { id } })
}
