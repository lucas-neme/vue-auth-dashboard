import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/services/auth.service', () => ({
  loginService: vi.fn().mockResolvedValue({
    accessToken: 'mock-token',
    user: {
      name: 'Usuário Teste',
      email: 'teste@demo.com'
    },
    expiresAt: '2030-01-01T00:00:00.000Z'
  })
}))

import { useAuthStore } from './auth'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('realiza login e persiste dados no localStorage', async () => {
    const store = useAuthStore()

    await store.login({
      email: 'teste@demo.com',
      password: '123456'
    })

    expect(store.isAuthenticated).toBe(true)
    expect(store.token).toBe('mock-token')
    expect(localStorage.getItem('auth_token')).toBe('mock-token')
    expect(localStorage.getItem('auth_user')).toContain('teste@demo.com')
  })
})