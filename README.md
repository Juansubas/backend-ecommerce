# 🛍️ E-commerce API - Hono + Prisma + PostgreSQL

API RESTful para tienda online desarrollada con [Hono](https://hono.dev/), [Prisma](https://www.prisma.io/), PostgreSQL y JWT.

---

## 📦 Features

- Registro e inicio de sesión con JWT  
- CRUD de productos (GET público)  
- Creación de órdenes (POST privado)  
- Consulta de órdenes del usuario autenticado  
- Swagger UI en `/docs/ui`  
- Docker para base de datos y entorno local  
- Semilla de productos automática  
- Pruebas automáticas con Vitest

---

## 🧠 Stack

- **Backend**: [Hono](https://hono.dev/) (Microframework ultra rápido)
- **ORM**: Prisma + PostgreSQL
- **Auth**: JSON Web Tokens (JWT)
- **Documentación**: Swagger (OpenAPI 3.0)
- **Contenedores**: Docker + Docker Compose
- **Testing**: Vitest

---

## 🚀 Instrucciones para correr el proyecto

### 1. 📁 Clonar el repositorio

```bash
git clone https://github.com/tuusuario/ecommerce-hono.git
cd ecommerce-hono
```

### 2. 🐳 Levantar PostgreSQL con Docker

```bash
docker-compose up -d
```

> Esto levantará una base de datos PostgreSQL en `localhost:5432`.

### 3. 📦 Instalar dependencias

```bash
npm install
```

### 4. ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce"
JWT_SECRET="superSecret"
```

### 5. 🧱 Migrar y sembrar la base de datos

```bash
npx prisma migrate dev --name init
npm run seed
```

> La semilla insertará productos de prueba automáticamente.

### 6. 🏁 Iniciar el servidor

```bash
npm run dev
```

Servidor disponible en: `http://localhost:3000`

---

## 📁 Estructura del proyecto

```
src/
├── app.ts               # App principal de Hono
├── index.ts             # Entry point
├── routes/              # Rutas de API (auth, products, orders)
├── middlewares/         # Middlewares (auth, logger, etc.)
├── lib/
│   └── prisma.ts        # Cliente de Prisma
├── schemas/             # Esquemas Zod u OpenAPI
└── utils/               # Helpers varios

tests/
├── auth.test.ts
├── products.test.ts
└── order.test.ts

prisma/
├── schema.prisma
└── seed.ts
```

---

## 🌐 Endpoints disponibles

### 🔐 Auth

| Método | Ruta             | Descripción             |
|--------|------------------|-------------------------|
| POST   | `/auth/register` | Registrar nuevo usuario |
| POST   | `/auth/login`    | Iniciar sesión y obtener token JWT |

### 👤 Usuario

| Método | Ruta        | Descripción                        |
|--------|-------------|------------------------------------|
| GET    | `/user/me`  | Obtener datos del usuario logueado |

### 📦 Productos

| Método | Ruta              | Descripción                      |
|--------|-------------------|----------------------------------|
| GET    | `/products`       | Obtener todos los productos      |
| GET    | `/products/:id`   | Obtener detalle de un producto   |

### 🧾 Órdenes

| Método | Ruta        | Descripción                             |
|--------|-------------|-----------------------------------------|
| GET    | `/orders`   | Obtener historial del usuario           |
| POST   | `/orders`   | Crear una nueva orden (requiere login)  |

### 🧪 Swagger UI

- **Doc JSON**: `GET /docs/doc`
- **Interfaz Swagger**: `GET /docs/ui`

---

## 🔑 Autenticación con JWT

Para acceder a rutas protegidas como `/orders`, debes incluir el token JWT en el header:

```
Authorization: Bearer TU_TOKEN
```

Puedes obtener el token al hacer login con `/auth/login`.

---

## 📥 Ejemplos de Requests

### POST `/auth/register`

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

### POST `/auth/login`

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

### POST `/orders` (requiere JWT)

```json
{
  "items": [
    { "productId": "uuid-product-1", "quantity": 2 },
    { "productId": "uuid-product-2", "quantity": 1 }
  ]
}
```

---

## 🧪 Tests

Este proyecto incluye pruebas automáticas con [Vitest](https://vitest.dev/):

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar en modo watch
npm run test:watch
```

Se testean:

- Registro de usuario
- Login
- Listado de productos
- Creación de órdenes (requiere JWT)
- Rutas protegidas con autorización

Ubicación: `tests/`

---

## 🌱 Seed automático

El archivo `prisma/seed.ts` incluye productos de prueba:

```ts
await db.product.createMany({
  data: [
    { name: 'Camisa', price: 19.99 },
    { name: 'Pantalón', price: 28.99 },
    { name: 'Zapatos', price: 39.99 },
  ],
})
```

### Ejecutar manualmente

```bash
npm run seed
```

Asegúrate de tener este script en tu `package.json`:

```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

---

## 🐳 Docker Compose

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ecommerce
    ports:
      - '5432:5432'
```

---

## 🔧 Comandos útiles

```bash
# Migrar base de datos
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate

# Acceder a Prisma Studio
npx prisma studio

# Ejecutar seed
npm run seed

# Iniciar en modo desarrollo
npm run dev

# Compilar TS
npm run build

# Ejecutar tests
npm run test
```

---

