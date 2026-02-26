# Vue Auth Dashboard

SPA de autenticação com Vue 3 + Pinia + Vue Router, incluindo rotas protegidas, dashboard mockado e validação de sessão via `localStorage`.

## Features

- Login com validação de formulário e feedback de erro.
- Persistência de sessão (`token`, `user`, `expiresAt`) no `localStorage`.
- Route Guards com `meta.requiresAuth`.
- Redirecionamento automático:
  - Usuário não autenticado tentando acessar rota protegida → `/login`.
  - Usuário autenticado tentando acessar `/login` → `/dashboard`.
- Dashboard com:
  - 3 cards de KPI (Leads, Conversão, Receita).
  - Filtro de período (7/30/90 dias) alterando dados mockados.
  - Tabela de atividades recentes (8 linhas por período).
- UX: alerta padrão reutilizável e loading states para login e troca de período.

## Tech Stack

- Vue 3 (`script setup`)
- TypeScript
- Vite
- Vue Router 4
- Pinia
- Vitest
- ESLint + Prettier

## Arquitetura

```text
src/
  components/
    BaseLayout.vue
    AppAlert.vue
  pages/
    Login.vue
    DashboardPage.vue
  router/
    index.ts
  services/
    auth.service.ts
  stores/
    auth.ts
```

- `services`: regras de integração (mock de autenticação).
- `stores`: estado global de auth e ações (`login`, `logout`, `hydrateFromStorage`).
- `router`: definição de rotas e guardas de navegação.
- `pages`: telas com comportamento de UI.
- `components`: layout e elementos reutilizáveis de interface.

## Credenciais Demo

- Email: `demo@demo.com`
- Senha: `123456`

## Como rodar

```bash
pnpm install
pnpm dev
```

### Scripts

- `pnpm build` — build de produção.
- `pnpm preview` — preview da build.
- `pnpm test` — executa testes unitários (Vitest).
- `pnpm test:watch` — modo watch para testes.
- `pnpm lint` — validação de lint.
- `pnpm format` — formatação de código.

## Testes unitários

- `src/services/auth.service.test.ts`
- `src/stores/auth.test.ts`

## What I learned

- **Auth**: centralizar autenticação no store simplifica fluxo de login/logout e persistência.
- **Guards**: `beforeEach` no router evita acesso indevido e reduz lógica duplicada nas páginas.
- **Protected Routes**: usar `meta.requiresAuth` deixa a proteção declarativa e escalável.
- **SPA**: experiência fluida com navegação cliente-side e redirecionamentos instantâneos.
- **State Management**: Pinia facilita estados compartilhados (`isAuthenticated`, `isLoading`, `error`) com tipagem clara.
