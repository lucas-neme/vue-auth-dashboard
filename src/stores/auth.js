import { defineStore } from 'pinia';
import { loginService } from '@/services/auth.service';
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: ''
    }),
    actions: {
        async login(payload) {
            this.isLoading = true;
            this.error = '';
            try {
                const response = await loginService(payload);
                this.token = response.accessToken;
                this.user = response.user;
                this.isAuthenticated = true;
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('auth_user', JSON.stringify(this.user));
                localStorage.setItem('auth_expires', response.expiresAt);
            }
            catch (error) {
                this.error = error instanceof Error ? error.message : 'Falha ao autenticar.';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
            this.error = '';
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            localStorage.removeItem('auth_expires');
        },
        hydrateFromStorage() {
            const token = localStorage.getItem('auth_token');
            const user = localStorage.getItem('auth_user');
            const expiresAt = localStorage.getItem('auth_expires');
            if (token && user && expiresAt) {
                if (new Date(expiresAt) > new Date()) {
                    this.token = token;
                    this.user = JSON.parse(user);
                    this.isAuthenticated = true;
                }
                else {
                    this.logout(); // Token expired
                }
            }
        }
    }
});
