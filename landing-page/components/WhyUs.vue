<template>
    <section
        class="mx-auto my-[20px] w-full max-w-4xl items-center justify-center px-[12px] py-[60px] text-center"
    >
        <header>
            <h1 class="text-[28px] font-bold leading-[38px] text-gray-800">
                Dlaczego
                <span
                    class="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-2 before:bg-orange-400"
                >
                    <span class="relative text-white">VocabMaster</span>
                </span>
                ?
            </h1>
        </header>
        <div class="mt-[38px] flex">
            <div v-for="item in data" :key="item.header">
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
        header: "Słownik",
        content: "Rozszerzaj swoje słownictwo dzięki wbudowanemu słownikowi.",
    },
    {
        header: "Gry językowe",
        content: "Dzięki grom przyswajasz nowo poznane słownictwo.",
    },
]
</script>
