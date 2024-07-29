<template>
    <router-link
        class="group flex w-min items-center hover:cursor-pointer"
        :to="props.to"
    >
        <slot>
            <arrow-left-icon
                class="mr-[8px] h-[18px] text-gray-800 transition group-hover:translate-x-[-5px]"
            />
            powrót
        </slot>
    </router-link>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    to: { type: String, required: true }
});
</script>
