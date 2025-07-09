export type UserPayload = {
  sub: string
  email?: string
  role?: string
  exp?: number
  iat?: number
}

export type AppContext = {
  Variables: {
    user: UserPayload
  }
}
