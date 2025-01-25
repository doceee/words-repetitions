<template>
    <section
        class="my-6 flex w-full flex-col items-center justify-center bg-primary text-center"
    >
        <header class="px-1 sm:px-0">
            <h1 class="mb-6 mt-8 text-2xl/9 font-bold text-white">
                Twoja podróż do biegłości językowej!
            </h1>

            <h2 class="my-7 max-w-4xl px-6 text-lg text-white">
                Chcesz opanować język angielski w prosty, efektywny i przyjemny
                sposób? VocabMaster to idealna aplikacja dla Ciebie! Niezależnie
                od tego, czy dopiero zaczynasz swoją przygodę z angielskim, czy
                chcesz doszlifować swoje umiejętności, nasza aplikacja dostosuje
                się do Twoich potrzeb.
            </h2>
        </header>
        <a
            target="_blank"
            :href="`${config.public.appUrl}/sign-up`"
            class="mx-auto mb-10 mt-8 h-fit w-[250px] rounded-[10px] border-[2px] border-white px-6 py-4 text-xl font-bold text-white transition-colors hover:bg-white hover:text-primary"
        >
            Rozpocznij
        </a>
    </section>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig()
</script>
