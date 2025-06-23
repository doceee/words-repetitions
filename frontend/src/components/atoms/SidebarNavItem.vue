<template>
    <component
        :is="props.to ? 'router-link' : 'button'"
        :to="props.to"
        class="group flex items-center rounded-lg border-[1px] border-transparent p-2 text-gray-900 hover:border-black"
        :class="[props.to ? 'nav-item' : 'block w-full text-start']"
    >
        <span class="flex-1 whitespace-nowrap">
            {{ text }}
        </span>
    </component>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        to?: string;
        text: string;
    }>(),
    {
        to: ''
    }
);
</script>
