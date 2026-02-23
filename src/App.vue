<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.hydrateFromStorage()
})
</script>
