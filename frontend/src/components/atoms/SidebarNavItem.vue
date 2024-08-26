<template>
    <li>
        <component
            :is="componentType"
            :to="props.to"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
            :class="[props.to ? 'nav-item' : 'block w-full text-start']"
        >
            <span class="flex-1 whitespace-nowrap group-hover:underline">
                {{ text }}
            </span>
        </component>
    </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        to?: string;
        text: string;
    }>(),
    {
        to: ''
    }
);

const componentType = computed(() => (props.to ? 'router-link' : 'button'));
</script>
