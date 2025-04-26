<template>
    <section
        class="mx-auto my-5 w-full max-w-4xl items-center justify-center py-16 text-center"
    >
        <header>
            <h1 class="mb-8 px-2 text-4xl/10 font-bold text-gray-800 sm:mb-16">
                Dlaczego
                <span
                    class="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-2 before:bg-secondary"
                >
                    <span class="relative text-white">VocabMaster</span>
                </span>
                ?
            </h1>
        </header>
        <div class="mt-9 flex flex-col px-2 sm:flex-row">
            <div
                v-for="(item, index) in data"
                :key="index"
                class="mx-2 mt-6 sm:mt-0"
            >
                <p class="mb-2 text-xl font-[600]">{{ item.header }}</p>
                <p class="text-base">
                    {{ item.content }}
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const data = [
    {
        header: "Interaktywne ćwiczenia",
        content:
            "Praktyczne zadania pomogą Ci utrwalić wiedzę i rozwinąć umiejętności językowe.",
    },
    {
        header: "Tłumacz angielskiego",
        content:
            "Rozszerzaj swoje słownictwo dzięki wbudowanemu tłumaczowi języka angielskiego.",
    },
    {
        header: "Gry językowe",
        content: "Dzięki grom przyswajasz nowo poznane słownictwo.",
    },
]
</script>
