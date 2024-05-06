<template>
    <h3 class="mb-2 mt-10 text-center text-lg font-medium text-gray-900">
        Słówko {{ `${index + 1}/${length}` }}
    </h3>
    <p
        class="mx-auto my-5 max-w-fit rounded-lg border-2 border-gray-200 bg-white p-5 font-bold text-gray-800"
    >
        {{ text }}
    </p>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    currentIndex: { type: Number, required: true },
    displayedText: { type: String, required: true },
    wordsLength: { type: Number, required: true }
});

const index = computed(() => props.currentIndex);
const text = computed(() => props.displayedText);
const length = computed(() => props.wordsLength);
</script>
