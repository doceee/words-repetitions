<template>
    <div
        class="flex w-full max-w-[210px] flex-col justify-center rounded-md bg-gray-100 px-[22px] py-[14px] text-left"
    >
        <h1 class="text-lg font-[800] leading-none text-gray-900">{{
            props.consecutiveActivity
        }}</h1>
        <p class="mb-[25px] text-sm leading-none text-gray-500">
            dni nauki z rzędu
        </p>

        <h1 class="text-lg font-[800] leading-none text-gray-900">{{
            props.reviewedWords
        }}</h1>
        <p class="mb-[25px] text-sm leading-none text-gray-500">
            powtórzonych słówek
        </p>

        <h1 class="text-lg font-[800] leading-none text-gray-900">{{
            props.reviewsDone
        }}</h1>
        <p class="mb-[25px] text-sm leading-none text-gray-500"
            >wykonanych powtórek
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
