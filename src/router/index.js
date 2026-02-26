import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/Login.vue';
import DashboardPage from '@/pages/DashboardPage.vue';
import { useAuthStore } from '@/stores/auth';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardPage,
            meta: {
                requiresAuth: true
            }
        }
    ]
});
router.beforeEach((to) => {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
        authStore.hydrateFromStorage();
    }
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return '/login';
    }
    if (to.path === '/login' && authStore.isAuthenticated) {
        return '/dashboard';
    }
    return true;
});
export default router;
