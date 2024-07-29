<template>
    <div>
        <nav-link to="/" />

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
import NavLink from '@/components/atoms/NavLink.vue';
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
