<template>
  <section class="dashboard">
    <header class="dashboard-header">
      <h2>Dashboard</h2>

      <div class="period-filter" role="group" aria-label="Filtro por período">
        <button
          v-for="period in periods"
          :key="period"
          type="button"
          class="period-btn"
          :disabled="isPeriodLoading"
          :class="{ active: selectedPeriod === period }"
          @click="selectedPeriod = period"
        >
          {{ period }} dias
        </button>
      </div>
    </header>

    <div class="kpi-grid">
      <article class="kpi-card">
        <p class="kpi-label">Total de Leads</p>
        <strong class="kpi-value">{{ currentData.totalLeads }}</strong>
      </article>

      <article class="kpi-card">
        <p class="kpi-label">Taxa de Conversão</p>
        <strong class="kpi-value">{{ currentData.conversionRate }}</strong>
      </article>

      <article class="kpi-card">
        <p class="kpi-label">Receita estimada</p>
        <strong class="kpi-value">{{ currentData.estimatedRevenue }}</strong>
      </article>
    </div>

    <section class="table-card">
      <h3>Atividades recentes</h3>

      <p v-if="isPeriodLoading" class="table-loading">Carregando atividades...</p>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Atividade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in currentData.activities" :key="activity.id">
              <td>{{ activity.date }}</td>
              <td>{{ activity.description }}</td>
              <td>
                <span class="status-badge" :class="activity.statusClass">{{ activity.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

type Period = 7 | 30 | 90

type Activity = {
  id: number
  date: string
  description: string
  status: string
  statusClass: 'success' | 'warning' | 'neutral'
}

type DashboardData = {
  totalLeads: string
  conversionRate: string
  estimatedRevenue: string
  activities: Activity[]
}

const periods: Period[] = [7, 30, 90]
const selectedPeriod = ref<Period>(7)
const displayedPeriod = ref<Period>(7)
const isPeriodLoading = ref(false)
let periodTimer: ReturnType<typeof setTimeout> | undefined

const mockByPeriod: Record<Period, DashboardData> = {
  7: {
    totalLeads: '124',
    conversionRate: '18,4%',
    estimatedRevenue: 'R$ 42.300',
    activities: [
      { id: 1, date: '25/02/2026', description: 'Lead criado: Ana Costa', status: 'Novo', statusClass: 'neutral' },
      { id: 2, date: '25/02/2026', description: 'Proposta enviada: Orion Tech', status: 'Em andamento', statusClass: 'warning' },
      { id: 3, date: '24/02/2026', description: 'Reunião concluída: Bruno Lima', status: 'Concluído', statusClass: 'success' },
      { id: 4, date: '24/02/2026', description: 'Follow-up realizado: InovaLab', status: 'Concluído', statusClass: 'success' },
      { id: 5, date: '23/02/2026', description: 'Lead criado: Carla Mota', status: 'Novo', statusClass: 'neutral' },
      { id: 6, date: '23/02/2026', description: 'Contato telefônico: Delta Ads', status: 'Em andamento', statusClass: 'warning' },
      { id: 7, date: '22/02/2026', description: 'Negócio ganho: Up Retail', status: 'Concluído', statusClass: 'success' },
      { id: 8, date: '21/02/2026', description: 'Lead desqualificado: Nexo Digital', status: 'Concluído', statusClass: 'success' }
    ]
  },
  30: {
    totalLeads: '486',
    conversionRate: '16,9%',
    estimatedRevenue: 'R$ 151.900',
    activities: [
      { id: 1, date: '24/02/2026', description: 'Lead criado: Vitor Souza', status: 'Novo', statusClass: 'neutral' },
      { id: 2, date: '22/02/2026', description: 'Proposta aprovada: Sky Finance', status: 'Concluído', statusClass: 'success' },
      { id: 3, date: '19/02/2026', description: 'Demo agendada: Nuvem ERP', status: 'Em andamento', statusClass: 'warning' },
      { id: 4, date: '18/02/2026', description: 'Contato inicial: Prisma Foods', status: 'Novo', statusClass: 'neutral' },
      { id: 5, date: '14/02/2026', description: 'Contrato enviado: Alfa Motors', status: 'Em andamento', statusClass: 'warning' },
      { id: 6, date: '11/02/2026', description: 'Negócio ganho: Green Box', status: 'Concluído', statusClass: 'success' },
      { id: 7, date: '08/02/2026', description: 'Lead criado: Laura Menezes', status: 'Novo', statusClass: 'neutral' },
      { id: 8, date: '02/02/2026', description: 'Follow-up pendente: SupraPay', status: 'Em andamento', statusClass: 'warning' }
    ]
  },
  90: {
    totalLeads: '1.352',
    conversionRate: '15,2%',
    estimatedRevenue: 'R$ 468.700',
    activities: [
      { id: 1, date: '20/02/2026', description: 'Lead criado: Horizonte TI', status: 'Novo', statusClass: 'neutral' },
      { id: 2, date: '15/02/2026', description: 'Proposta enviada: Atlas Saúde', status: 'Em andamento', statusClass: 'warning' },
      { id: 3, date: '06/02/2026', description: 'Negócio ganho: Nova Energia', status: 'Concluído', statusClass: 'success' },
      { id: 4, date: '28/01/2026', description: 'Reunião estratégica: Pixel Hub', status: 'Concluído', statusClass: 'success' },
      { id: 5, date: '17/01/2026', description: 'Lead reativado: Mobi Center', status: 'Em andamento', statusClass: 'warning' },
      { id: 6, date: '09/01/2026', description: 'Contato inicial: Blue Home', status: 'Novo', statusClass: 'neutral' },
      { id: 7, date: '27/12/2025', description: 'Contrato assinado: Veloz Log', status: 'Concluído', statusClass: 'success' },
      { id: 8, date: '05/12/2025', description: 'Lead desqualificado: Terra Sul', status: 'Concluído', statusClass: 'success' }
    ]
  }
}

watch(selectedPeriod, (period) => {
  clearTimeout(periodTimer)
  isPeriodLoading.value = true

  periodTimer = setTimeout(() => {
    displayedPeriod.value = period
    isPeriodLoading.value = false
  }, 300)
})

onBeforeUnmount(() => {
  clearTimeout(periodTimer)
})

const currentData = computed(() => mockByPeriod[displayedPeriod.value])
</script>

<style scoped>
.dashboard {
  display: grid;
  gap: 20px;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

h2 {
  margin: 0;
  color: #0f172a;
}

.period-filter {
  display: flex;
  gap: 8px;
}

.period-btn {
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #334155;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
}

.period-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.period-btn.active {
  border-color: #2563eb;
  background: #2563eb;
  color: #fff;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.kpi-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.kpi-label {
  margin: 0 0 8px;
  color: #64748b;
  font-size: 0.9rem;
}

.kpi-value {
  color: #0f172a;
  font-size: 1.4rem;
}

.table-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

h3 {
  margin: 0 0 14px;
  color: #0f172a;
  font-size: 1.05rem;
}

.table-wrap {
  overflow-x: auto;
}

.table-loading {
  margin: 0;
  color: #475569;
  font-size: 0.92rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 10px 8px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.92rem;
}

th {
  color: #475569;
  font-weight: 600;
}

td {
  color: #0f172a;
}

.status-badge {
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 0.78rem;
  font-weight: 600;
}

.status-badge.success {
  background: #dcfce7;
  color: #166534;
}

.status-badge.warning {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.neutral {
  background: #e2e8f0;
  color: #334155;
}

@media (max-width: 860px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
