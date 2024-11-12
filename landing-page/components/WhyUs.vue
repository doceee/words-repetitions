<template>
    <section
        class="mx-auto my-5 w-full max-w-4xl items-center justify-center px-3 py-16 text-center"
    >
        <header>
            <h1 class="text-[28px] font-bold leading-[38px] text-gray-800">
                Dlaczego
                <span
                    class="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-2 before:bg-secondary"
                >
                    <span class="relative text-white">VocabMaster</span>
                </span>
                ?
            </h1>
        </header>
        <div class="mt-9 flex">
            <div v-for="item in data" :key="item.header" class="mx-2">
                <p class="text-[14px] font-[600]">{{ item.header }}</p>
                <p class="text-[12px]">
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
