import { describe, it, expect, beforeAll } from 'vitest'
import app from '../src/app'
import { db } from '../src/lib/prisma'

const user = { email: 'test@test.com', password: '123456' }

beforeAll(async () => {
  await db.orderItem.deleteMany()
  await db.order.deleteMany()
  await db.product.deleteMany()
  await db.user.deleteMany({ where: { email: user.email } })
})

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await app.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })

    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body).toHaveProperty('email', user.email)
  })

  it('should login with correct credentials', async () => {
    const res = await app.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toHaveProperty('token')
  })
})
