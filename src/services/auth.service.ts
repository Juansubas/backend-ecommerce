import * as UserRepo from '../repositories/user.repository'
import bcrypt from 'bcryptjs'
import { signJwt } from '../lib/jwt'
import { AuthRequestBody, AuthResponse } from '../types/auth'

export const register = async ({ email, password }: AuthRequestBody): Promise<AuthResponse> => {
  const exists = await UserRepo.findUserByEmail(email)
  if (exists) throw new Error('User already exists')

  const hash = await bcrypt.hash(password, 10)
  const user = await UserRepo.createUser(email, hash)

  return { id: user.id, email: user.email }
}

export const login = async ({ email, password }: AuthRequestBody): Promise<string> => {
  const user = await UserRepo.findUserByEmail(email)
  if (!user) throw new Error('Invalid credentials')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Invalid credentials')

  return signJwt({ sub: user.id, email: user.email })
}
