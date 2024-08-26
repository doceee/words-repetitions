<template>
    <h3 class="mb-2 mt-10 text-center text-lg font-medium text-gray-900">
        Słówko {{ `${props.currentIndex + 1}/${props.wordsLength}` }}
    </h3>
    <p
        class="mx-auto my-5 max-w-fit rounded-lg border-2 border-gray-200 bg-white p-5 font-bold text-gray-800"
    >
        {{ props.displayedText }}
    </p>
</template>

<script lang="ts" setup>
const props = defineProps({
    currentIndex: { type: Number, required: true },
    displayedText: { type: String, required: true },
    wordsLength: { type: Number, required: true }
});
</script>
