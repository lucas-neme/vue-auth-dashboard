<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <h1>Vue Auth Dashboard</h1>
        <nav>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
        </nav>
      </div>
    </header>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

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
  gap: 14px;
}

.content {
  margin: 0 auto;
  max-width: 1024px;
  padding: 24px 20px;
}
</style>
