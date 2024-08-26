<template>
    <div
        class="flex h-[235px] w-full max-w-[210px] flex-col justify-center rounded-md bg-gray-100 px-[12px] py-[14px] text-center"
    >
        <user-circle-icon class="h-[55px] text-blue-500" />

        <h1 class="mt-[12px] font-[600]">{{ props.email }}</h1>
    </div>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    email: { type: String }
});
</script>
