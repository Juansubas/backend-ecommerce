import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const products = [
    { name: 'Laptop ASUS', price: 1200, stock: 5 },
    { name: 'Teclado Mecánico', price: 100, stock: 10 },
    { name: 'Mouse Gamer', price: 50, stock: 15 },
  ]

  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()

  await prisma.product.createMany({ data: products })

  console.log('✅ Productos insertados correctamente')
}

main()
  .catch((e) => {
    console.error('Error insertando productos', e)
  })
  .finally(() => prisma.$disconnect())
