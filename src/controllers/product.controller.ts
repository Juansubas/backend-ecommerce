import { Context } from 'hono'
import * as ProductService from '../services/product.service'

export const getProducts = async (c: Context) => {
  const products = await ProductService.getAll()
  return c.json(products)
}

export const getProductById = async (c: Context) => {
  const id = c.req.param('id')
  const product = await ProductService.getById(id)
  if (!product) return c.json({ error: 'Product not found' }, 404)
  return c.json(product)
}