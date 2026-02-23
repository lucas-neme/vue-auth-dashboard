export type LoginPayload = {
  email: string
  password: string
}

export type User = {
  name: string
  email: string
}

export type AuthResponse = {
  accessToken: string
  user: User
  expiresAt: string
}

export async function loginService(payload: LoginPayload): Promise<AuthResponse> {
  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (payload.email === 'demo@demo.com' && payload.password === '123456') {
    const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString() // Expira em 1 hora
    
    return {
      accessToken: 'fake-jwt-token-123456789',
      user: {
        name: 'Usuário Demo',
        email: payload.email,
      },
      expiresAt,
    }
  }

  throw new Error('Email ou senha inválidos. Tente (demo@demo.com / 123456).')
}
