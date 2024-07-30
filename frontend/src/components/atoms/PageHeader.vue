<template>
    <h1 class="mx-[18px] my-[18px] text-2xl font-bold">{{ props.title }}</h1>
</template>

<script setup lang="ts">
const props = defineProps({
    title: { type: String, required: true }
});
</script>
