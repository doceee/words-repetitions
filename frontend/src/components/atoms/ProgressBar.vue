<template>
    <div class="h-[14px] w-full rounded-full bg-gray-500">
        <div
            class="h-[14px] rounded-full bg-green-500 transition-[width] duration-500"
            :style="{ width: `${width}%` }"
        ></div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    max: { type: Number, required: true },
    value: { type: Number, required: true }
});

const width = computed(() => (100 * props.value) / props.max);
</script>
