<template>
    <div>
        <router-link class="flex items-center hover:cursor-pointer" to="/">
            <arrow-left-icon class="mr-[8px] h-[18px] text-gray-800" /> powrót
        </router-link>

        <div v-if="loggedUser">
            <p class="my-[28px]" v-if="createdAt"
                >Konto założone: {{ createdAt }}</p
            >

            <v-input
                id="email"
                v-model="loggedUser.email"
                label="Email"
                type="email"
                disabled
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import VInput from '@/components/atoms/VInput.vue';
import { useAuthStore } from '@/store/modules/auth';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const authStore = useAuthStore();
const { loggedUser } = storeToRefs(authStore);

const createdAt = computed(() =>
    new Date(loggedUser.value?.createdAt || '').toLocaleDateString('pl-PL')
);
</script>
