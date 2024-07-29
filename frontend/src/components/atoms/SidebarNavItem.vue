<template>
    <li>
        <component
            :is="componentType"
            :to="to"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
            :class="{ 'block w-full text-start': !props.to }"
        >
            <component :is="icon" class="h-5 w-5 flex-shrink-0" />
            <span class="ms-3 flex-1 whitespace-nowrap group-hover:underline">
                {{ text }}
            </span>
        </component>
    </li>
</template>

<script lang="ts" setup>
import { computed, type FunctionalComponent } from 'vue';

const props = withDefaults(
    defineProps<{
        to?: string;
        text: string;
        icon: FunctionalComponent;
    }>(),
    {
        to: ''
    }
);

const componentType = computed(() => (props.to ? 'router-link' : 'button'));
</script>
