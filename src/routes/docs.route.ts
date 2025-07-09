// src/routes/docs.route.ts
import { Hono } from 'hono'
import { swaggerUI } from '@hono/swagger-ui'

const docsRoute = new Hono()

const openApiDoc = {
  openapi: '3.0.0',
  info: {
    title: 'API Ecommerce',
    version: '1.0.0',
    description: 'API para tienda online',
  },
  paths: {
    '/auth/register': {
      post: {
        summary: 'Registrar nuevo usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Usuario registrado' },
          400: { description: 'Ya existe' },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Iniciar sesión',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Token JWT' },
          401: { description: 'Credenciales inválidas' },
        },
      },
    },
    '/products': {
      get: {
        summary: 'Obtener todos los productos',
        responses: {
          200: { description: 'Lista de productos' },
        },
      },
    },
    '/products/{id}': {
      get: {
        summary: 'Obtener detalle de un producto',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Producto' },
          404: { description: 'No encontrado' },
        },
      },
    },
    '/orders': {
      get: {
        summary: 'Historial de órdenes',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Órdenes del usuario' },
        },
      },
      post: {
        summary: 'Crear una orden',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        productId: { type: 'string' },
                        quantity: { type: 'number' },
                        price: { type: 'number' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Orden creada' },
        },
      },
    },
    '/user/me': {
      get: {
        summary: 'Obtener usuario autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Datos del usuario' },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
}

docsRoute.get('/doc', (c) => c.json(openApiDoc))
docsRoute.get('/ui', swaggerUI({ url: '/docs/doc' }))
docsRoute.get("/health", (c) => c.text("OK"));

export default docsRoute
