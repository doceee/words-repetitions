<template>
    <div>
        <page-header title="Profil" />

        <div v-if="authStore.loggedUser">
            <p class="my-[28px]" v-if="createdAt">
                Konto założone: {{ createdAt }}
            </p>

            <v-input
                id="email"
                v-model="authStore.loggedUser.email"
                label="Email"
                type="email"
                disabled
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import VInput from '@/components/atoms/VInput.vue';
import { useAuthStore } from '@/store/modules/auth';
import { computed } from 'vue';
import PageHeader from '@/components/atoms/PageHeader.vue';
const authStore = useAuthStore();

const createdAt = computed(() =>
    new Date(authStore.loggedUser?.createdAt || '').toLocaleDateString('pl-PL')
);
</script>
