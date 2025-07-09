import { JwtPayload } from 'jsonwebtoken'
import { ContextVariableMap } from 'hono'

declare module 'hono' {
  interface ContextVariableMap {
    user: JwtPayload & { id: string; email: string }
  }
}
