<template>
    <div class="mx-auto w-full rounded-lg bg-yellow-200 px-6 py-3 text-left">
        <h1 class="text-md">{{ header }}</h1>
        <component
            :is="to ? 'router-link' : 'p'"
            :to="to"
            class="text-sm text-gray-700"
        >
            {{ subheader }}
        </component>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        to?: string;
        header: string;
        subheader: string;
    }>(),
    {
        to: ''
    }
);
</script>
