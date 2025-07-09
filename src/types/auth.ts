export interface AuthRequestBody {
  email: string
  password: string
}

export interface AuthResponse {
  id: string
  email: string
}

export type UserJwtPayload = {
  sub: string
  email: string
}
