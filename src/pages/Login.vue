<template>
  <section class="login-page">
    <div class="login-card">
      <h2>Entrar</h2>
      <p class="subtitle">Acesse sua conta para continuar.</p>

      <form class="login-form" novalidate @submit.prevent="handleSubmit">
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            placeholder="voce@empresa.com"
            autocomplete="email"
            :disabled="authStore.isLoading"
            :aria-invalid="Boolean(errors.email)"
          />
          <small v-if="errors.email" class="field-error">{{ errors.email }}</small>
        </div>

        <div class="field">
          <label for="password">Senha</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Digite sua senha"
            autocomplete="current-password"
            :disabled="authStore.isLoading"
            :aria-invalid="Boolean(errors.password)"
          />
          <small v-if="errors.password" class="field-error">{{ errors.password }}</small>
        </div>

        <AppAlert v-if="submitError" :message="submitError" variant="error" />

        <button type="submit" :disabled="authStore.isLoading" class="submit-btn">
          {{ authStore.isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppAlert from '@/components/AppAlert.vue'

type LoginForm = {
  email: string
  password: string
}

type FormErrors = {
  email: string
  password: string
}

const form = reactive<LoginForm>({
  email: '',
  password: ''
})

const errors = reactive<FormErrors>({
  email: '',
  password: ''
})

const submitError = ref('')
const router = useRouter()
const authStore = useAuthStore()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(): boolean {
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Informe seu email.'
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Informe um email válido.'
  }

  if (!form.password) {
    errors.password = 'Informe sua senha.'
  } else if (form.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.'
  }

  return !errors.email && !errors.password
}

async function handleSubmit() {
  submitError.value = ''

  if (!validateForm()) {
    return
  }

  try {
    await authStore.login({
      email: form.email,
      password: form.password
    })
    router.push('/dashboard')
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : authStore.error || 'Falha ao autenticar.'
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 120px);
  display: grid;
  place-items: center;
  padding: 20px 0;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
}

h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #0f172a;
}

.subtitle {
  margin: 6px 0 20px;
  color: #64748b;
  font-size: 0.95rem;
}

.login-form {
  display: grid;
  gap: 16px;
}

.field {
  display: grid;
  gap: 6px;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
}

input {
  width: 100%;
  height: 42px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
}

input[aria-invalid='true'] {
  border-color: #dc2626;
}

.field-error {
  margin: 0;
  font-size: 0.85rem;
  color: #dc2626;
}

.submit-btn {
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:enabled {
  background: #1d4ed8;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .login-card {
    padding: 20px;
    border-radius: 10px;
  }
}
</style>

