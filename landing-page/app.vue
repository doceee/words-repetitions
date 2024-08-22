<template>
    <top-bar />

    <main class="w-full">
        <master-language />
        <course-for-you />
        <why-us />
    </main>

    <the-footer />
</template>

<script setup lang="ts">
useHead({
    htmlAttrs: { lang: "pl" },
})

useSeoMeta({
    titleTemplate: "VocabMaster",
    description:
        "Nauka angielskiego online! Platforma do nauki języka angielskiego przez internet! VocabMaster",
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1",
})
</script>
