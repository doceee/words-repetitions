<template>
    <div class="mx-auto w-full rounded-lg bg-yellow-200 px-6 py-3 text-left">
        <h1 class="text-md">{{ props.header }}</h1>
        <component
            :is="props.to ? 'router-link' : 'p'"
            to="word-list"
            class="text-sm text-gray-700"
        >
            {{ props.subheader }}
        </component>
    </div>
</template>
<script setup lang="ts">
const props = withDefaults(
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
