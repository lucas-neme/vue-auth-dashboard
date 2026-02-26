<template>
  <p class="alert" :class="variant" role="alert">{{ message }}</p>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string
    variant?: 'error' | 'success' | 'info'
  }>(),
  {
    variant: 'info'
  }
)
</script>

<style scoped>
.alert {
  margin: 0;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.9rem;
  border: 1px solid transparent;
}

.error {
  background: #fef2f2;
  border-color: #fecaca;
  color: #b91c1c;
}

.success {
  background: #ecfdf5;
  border-color: #bbf7d0;
  color: #166534;
}

.info {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}
</style>