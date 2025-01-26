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
    title: "VocabMaster",
    meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
            name: "description",
            content:
                "Nauka angielskiego online! Platforma do nauki języka angielskiego przez internet! VocabMaster",
        },
        {
            name: "keywords",
            content:
                "nauka angielskiego, angielski, nauka online, angielski online",
        },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/public/favicon.ico" }],
})

useSeoMeta({
    viewport: "width=device-width, initial-scale=1",
})
</script>
