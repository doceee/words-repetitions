<template>
    <div class="mx-auto mb-6 mt-8 max-w-[267px] sm:w-full sm:max-w-full">
        <h2
            class="mt-4 text-center text-2xl font-semibold leading-8 text-gray-700 sm:mt-5 sm:text-4xl sm:font-medium"
        >
            Logowanie
        </h2>
    </div>
    <form
        class="mx-auto flex max-w-[400px] flex-col gap-4"
        @submit.prevent="onSubmit"
    >
        <div class="mt-1">
            <v-input
                id="email"
                v-model="email"
                label="Email"
                placeholder="jan.kowalski@gmail.com"
                required
                type="email"
                :red-border="isAuthError"
                :error="getError('email')"
                @input="
                    () => {
                        isAuthError = false;
                        clearError('email');
                    }
                "
            />
            <v-input
                id="password"
                v-model="password"
                placeholder="************"
                required
                label="Hasło"
                type="password"
                :error="getError('password')"
                @input="
                    () => {
                        isAuthError = false;
                        clearError('password');
                    }
                "
            />
        </div>

        <v-button type="submit" :is-disabled="isProcessing" class="mt-1">
            Zaloguj
        </v-button>
    </form>

    <p class="mb-8 mt-4 text-right text-sm text-gray-600">
        Nie masz konta?
        <v-button to="/sign-up" link>Rejestracja</v-button>
    </p>
</template>

<script lang="ts" setup>
import { AxiosError } from 'axios';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import {
    email as emailRules,
    password as passwordRules
} from '@/helpers/validationRules';
import VInput from '@/components/atoms/VInput.vue';
import VButton from '@/components/atoms/VButton.vue';
import { useAuthStore } from '@/store/modules/auth';
import type { ServerError } from '@/types/auth';

const email = ref('');
const password = ref('');
const isProcessing = ref(false);
const isAuthError = ref(false);
const serverErrors = ref<ServerError[]>([]);
const rules = computed(() => ({
    email: emailRules,
    password: {
        ...passwordRules,
        invalidCredentials: helpers.withMessage(
            `Nieprawidłowe dane logowania.`,
            () => !isAuthError.value
        )
    }
}));
const authStore = useAuthStore();
const v$ = useVuelidate(rules, { email, password });
const router = useRouter();

const onSubmit = async () => {
    clearError();
    v$.value.$validate();

    if (v$.value.$invalid) {
        return;
    }

    isProcessing.value = true;

    try {
        await authStore.login({
            email: email.value,
            password: password.value
        });

        router.push({
            name: 'dashboard'
        });
    } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
            const { response } = error;

            if (response) {
                const { status, data } = response;

                if (status === 400 && data) {
                    serverErrors.value = [response.data];

                    return;
                }

                if (status === 401) {
                    isAuthError.value = true;
                }
            }
        }
    } finally {
        isProcessing.value = false;
    }
};

const getError = (key: string) => {
    if (serverErrors.value.some(item => item.param === key)) {
        return serverErrors.value.find(item => item.param === key)?.msg;
    }

    return v$.value[key].$errors.length
        ? v$.value[key].$errors[0].$message
        : '';
};

const clearError = (key?: string) => {
    if (key && serverErrors.value.some(item => item.param === key)) {
        serverErrors.value = serverErrors.value.filter(
            item => item.param !== key
        );

        return;
    }

    serverErrors.value = [];
};
</script>
