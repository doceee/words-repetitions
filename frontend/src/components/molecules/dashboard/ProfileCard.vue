<template>
    <div
        class="flex h-[235px] w-full max-w-[210px] flex-col justify-center rounded-md bg-gray-100 px-3 py-3 text-center"
    >
        <user-circle-icon class="h-[55px] text-blue-500" />

        <h1 class="mt-3 font-medium">{{ props.email }}</h1>
    </div>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    email: { type: String }
});
</script>
