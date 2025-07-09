import { describe, it, expect, beforeAll } from 'vitest'
import { db } from '../src/lib/prisma'
import app from '../src/app'

describe('Products Endpoints', () => {
  beforeAll(async () => {
    await db.orderItem.deleteMany()
    await db.order.deleteMany()
    await db.product.deleteMany()

    await db.product.createMany({
      data: [
        { name: 'Laptop ASUS', price: 1200, stock: 5 },
        { name: 'Teclado Mecánico', price: 100, stock: 10 },
        { name: 'Mouse Gamer', price: 50, stock: 15 },
      ],
    })
  })

  it('should return a list of products', async () => {
    const res = await app.request('/products', {
      method: 'GET',
    })

    expect(res.status).toBe(200)

    const data = await res.json()

    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })
})
