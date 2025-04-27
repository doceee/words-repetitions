<template>
    <div
        class="flex h-[235px] w-full max-w-[210px] flex-col justify-center rounded-md bg-gray-100 px-6 py-3 text-left"
    >
        <h1 class="text-lg font-medium leading-none text-gray-900">
            {{ props.consecutiveActivity }}
        </h1>
        <p class="mb-6 text-sm leading-none text-gray-500">
            dni nauki z rzędu
        </p>

        <h1 class="text-lg font-medium leading-none text-gray-900">
            {{ props.reviewedWords }}
        </h1>
        <p class="mb-6 text-sm leading-none text-gray-500">
            powtórzonych słówek
        </p>

        <h1 class="text-lg font-medium leading-none text-gray-900">
            {{ props.reviewsDone }}
        </h1>
        <p class="mb-6 text-sm leading-none text-gray-500">
            wykonanych powtórek
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    consecutiveActivity: { type: Number },
    reviewedWords: { type: Number },
    reviewsDone: { type: Number }
});
</script>
