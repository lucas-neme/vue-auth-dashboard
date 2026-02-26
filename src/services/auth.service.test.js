import { describe, expect, it, vi } from 'vitest';
import { loginService } from './auth.service';
describe('auth.service', () => {
    it('retorna token e usuário para credenciais demo', async () => {
        vi.useFakeTimers();
        const loginPromise = loginService({
            email: 'demo@demo.com',
            password: '123456'
        });
        await vi.advanceTimersByTimeAsync(800);
        const result = await loginPromise;
        expect(result.accessToken).toBeTruthy();
        expect(result.user.email).toBe('demo@demo.com');
        expect(new Date(result.expiresAt).getTime()).toBeGreaterThan(Date.now());
        vi.useRealTimers();
    });
});
