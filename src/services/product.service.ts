import * as ProductRepo from '../repositories/product.repository'
import { Product } from '@prisma/client'

export const getAll = async (): Promise<Product[]> => {
  return await ProductRepo.getAll()
}

export const getById = async (id: string): Promise<Product> => {
  const product = await ProductRepo.getById(id)
  if (!product) {
    throw new Error('Product not found')
  }
  return product
}