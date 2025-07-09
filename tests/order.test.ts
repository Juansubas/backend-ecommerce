import { describe, it, expect, beforeAll } from 'vitest'
import app from '../src/app'
import { db } from '../src/lib/prisma'

let token = ''
let productId = ''

describe('Orders Endpoints', () => {
  beforeAll(async () => {
    await db.orderItem.deleteMany()
    await db.order.deleteMany()
    await db.product.deleteMany()
    await db.user.deleteMany({ where: { email: 'order@test.com' } })

    // Crear usuario
    await app.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email: 'order@test.com', password: '123456' }),
      headers: { 'Content-Type': 'application/json' },
    })

    // Login
    const loginRes = await app.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'order@test.com', password: '123456' }),
      headers: { 'Content-Type': 'application/json' },
    })

    const loginBody = await loginRes.json()
    token = loginBody.token

    // Crear producto directamente en DB
    const product = await db.product.create({
      data: {
        name: 'Test Product',
        price: 20,
        stock: 100,
      },
    })

    productId = product.id
  })

  it('should fail to create order without auth', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    })

    expect(res.status).toBe(401)
  })

  it('should return 200 for authenticated GET /orders', async () => {
    const res = await app.request('/orders', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(res.status).toBe(200)
  })

  it('should create a new order', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ productId, quantity: 2, price: 20 }],
      }),
    })

    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body).toHaveProperty('id')
  })
})
