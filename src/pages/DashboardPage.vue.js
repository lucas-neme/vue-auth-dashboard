import { computed, onBeforeUnmount, ref, watch } from 'vue';
const periods = [7, 30, 90];
const selectedPeriod = ref(7);
const displayedPeriod = ref(7);
const isPeriodLoading = ref(false);
let periodTimer;
const mockByPeriod = {
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
};
watch(selectedPeriod, (period) => {
    clearTimeout(periodTimer);
    isPeriodLoading.value = true;
    periodTimer = setTimeout(() => {
        displayedPeriod.value = period;
        isPeriodLoading.value = false;
    }, 300);
});
onBeforeUnmount(() => {
    clearTimeout(periodTimer);
});
const currentData = computed(() => mockByPeriod[displayedPeriod.value]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['period-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['period-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "dashboard" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "dashboard-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "period-filter" },
    role: "group",
    'aria-label': "Filtro por período",
});
for (const [period] of __VLS_getVForSourceType((__VLS_ctx.periods))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectedPeriod = period;
            } },
        key: (period),
        type: "button",
        ...{ class: "period-btn" },
        disabled: (__VLS_ctx.isPeriodLoading),
        ...{ class: ({ active: __VLS_ctx.selectedPeriod === period }) },
    });
    (period);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "kpi-grid" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({
    ...{ class: "kpi-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "kpi-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({
    ...{ class: "kpi-value" },
});
(__VLS_ctx.currentData.totalLeads);
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({
    ...{ class: "kpi-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "kpi-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({
    ...{ class: "kpi-value" },
});
(__VLS_ctx.currentData.conversionRate);
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({
    ...{ class: "kpi-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "kpi-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({
    ...{ class: "kpi-value" },
});
(__VLS_ctx.currentData.estimatedRevenue);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "table-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
if (__VLS_ctx.isPeriodLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "table-loading" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-wrap" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [activity] of __VLS_getVForSourceType((__VLS_ctx.currentData.activities))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (activity.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (activity.date);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (activity.description);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "status-badge" },
            ...{ class: (activity.statusClass) },
        });
        (activity.status);
    }
}
/** @type {__VLS_StyleScopedClasses['dashboard']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-header']} */ ;
/** @type {__VLS_StyleScopedClasses['period-filter']} */ ;
/** @type {__VLS_StyleScopedClasses['period-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-card']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-label']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-card']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-label']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-card']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-label']} */ ;
/** @type {__VLS_StyleScopedClasses['kpi-value']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['table-loading']} */ ;
/** @type {__VLS_StyleScopedClasses['table-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            periods: periods,
            selectedPeriod: selectedPeriod,
            isPeriodLoading: isPeriodLoading,
            currentData: currentData,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
