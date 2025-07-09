import { Hono } from 'hono'
import * as ProductController from '../controllers/product.controller'

const productRoutes = new Hono()

productRoutes.get('/', ProductController.getProducts)
productRoutes.get('/:id', ProductController.getProductById)

export default productRoutes