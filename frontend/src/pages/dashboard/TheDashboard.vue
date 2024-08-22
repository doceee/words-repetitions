<template>
    <the-container>
        <profile-card :email="authStore.loggedUser?.email" />
    </the-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth';
import TheContainer from '@/components/molecules/TheContainer.vue';
import ProfileCard from '@/components/molecules/dashboard/ProfileCard.vue';

const authStore = useAuthStore();
</script>
