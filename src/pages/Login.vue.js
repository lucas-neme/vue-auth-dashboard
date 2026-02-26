import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AppAlert from '@/components/AppAlert.vue';
const form = reactive({
    email: '',
    password: ''
});
const errors = reactive({
    email: '',
    password: ''
});
const submitError = ref('');
const router = useRouter();
const authStore = useAuthStore();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateForm() {
    errors.email = '';
    errors.password = '';
    if (!form.email) {
        errors.email = 'Informe seu email.';
    }
    else if (!emailRegex.test(form.email)) {
        errors.email = 'Informe um email válido.';
    }
    if (!form.password) {
        errors.password = 'Informe sua senha.';
    }
    else if (form.password.length < 6) {
        errors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }
    return !errors.email && !errors.password;
}
async function handleSubmit() {
    submitError.value = '';
    if (!validateForm()) {
        return;
    }
    try {
        await authStore.login({
            email: form.email,
            password: form.password
        });
        router.push('/dashboard');
    }
    catch (error) {
        submitError.value = error instanceof Error ? error.message : authStore.error || 'Falha ao autenticar.';
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "login-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "subtitle" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: "login-form" },
    novalidate: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "email",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "email",
    type: "email",
    placeholder: "voce@empresa.com",
    autocomplete: "email",
    disabled: (__VLS_ctx.authStore.isLoading),
    'aria-invalid': (Boolean(__VLS_ctx.errors.email)),
});
(__VLS_ctx.form.email);
if (__VLS_ctx.errors.email) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
        ...{ class: "field-error" },
    });
    (__VLS_ctx.errors.email);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "password",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "password",
    type: "password",
    placeholder: "Digite sua senha",
    autocomplete: "current-password",
    disabled: (__VLS_ctx.authStore.isLoading),
    'aria-invalid': (Boolean(__VLS_ctx.errors.password)),
});
(__VLS_ctx.form.password);
if (__VLS_ctx.errors.password) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
        ...{ class: "field-error" },
    });
    (__VLS_ctx.errors.password);
}
if (__VLS_ctx.submitError) {
    /** @type {[typeof AppAlert, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(AppAlert, new AppAlert({
        message: (__VLS_ctx.submitError),
        variant: "error",
    }));
    const __VLS_1 = __VLS_0({
        message: (__VLS_ctx.submitError),
        variant: "error",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    disabled: (__VLS_ctx.authStore.isLoading),
    ...{ class: "submit-btn" },
});
(__VLS_ctx.authStore.isLoading ? 'Entrando...' : 'Entrar');
/** @type {__VLS_StyleScopedClasses['login-page']} */ ;
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field-error']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field-error']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            AppAlert: AppAlert,
            form: form,
            errors: errors,
            submitError: submitError,
            authStore: authStore,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
