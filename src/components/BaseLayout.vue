<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <h1>Vue Auth Dashboard</h1>
        <nav>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <RouterLink v-if="!authStore.isAuthenticated" to="/login">Login</RouterLink>
          <button v-else type="button" class="logout-btn" @click="handleLogout">Logout</button>
        </nav>
      </div>
    </header>

    <main class="content">
      <AppAlert v-if="feedbackMessage" class="feedback-alert" :message="feedbackMessage" variant="success" />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppAlert from '@/components/AppAlert.vue'

const router = useRouter()
const authStore = useAuthStore()
const feedbackMessage = ref('')
let feedbackTimer: ReturnType<typeof setTimeout> | undefined

function handleLogout() {
  authStore.logout()
  feedbackMessage.value = 'Logout realizado com sucesso.'
  clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => {
    feedbackMessage.value = ''
  }, 2500)
  router.push('/login')
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  background: #1f2937;
  color: #fff;
  padding: 12px 20px;
}

.header-content {
  margin: 0 auto;
  max-width: 1024px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-content h1 {
  margin: 0;
  font-size: 1.1rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logout-btn {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #94a3b8;
  border-radius: 6px;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.logout-btn:hover {
  border-color: #cbd5e1;
}

.content {
  margin: 0 auto;
  max-width: 1024px;
  padding: 24px 20px;
}

.feedback-alert {
  margin-bottom: 16px;
}
</style>
