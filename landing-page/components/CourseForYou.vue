<template>
    <section
        class="mx-auto my-6 flex w-full items-center justify-center bg-primary px-3 py-16 text-center"
    >
        <div class="mx-auto w-full max-w-4xl">
            <header>
                <h1 class="text-[28px] font-bold leading-[38px] text-gray-100">
                    Twoja podróż do biegłości językowej!
                </h1>

                <h2 class="my-7 px-6 text-gray-200">
                    Chcesz opanować język angielski w prosty, efektywny i
                    przyjemny sposób? VocabMaster to idealna aplikacja dla
                    Ciebie! Niezależnie od tego, czy dopiero zaczynasz swoją
                    przygodę z angielskim, czy chcesz doszlifować swoje
                    umiejętności, nasza aplikacja dostosuje się do Twoich
                    potrzeb.
                </h2>
            </header>
            <a
                target="_blank"
                :href="`${config.public.appUrl}sign-up`"
                class="mx-auto h-fit w-[250px] rounded-[10px] border-[2px] border-white px-6 py-4 text-[16px] font-bold text-white transition-colors hover:bg-white hover:text-primary"
            >
                Rozpocznij
            </a>
        </div>
    </section>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig()
</script>
