<template>
    <section
        class="mx-auto my-20 flex w-full max-w-4xl flex-col items-center justify-center text-center sm:flex-row sm:text-left md:text-center"
    >
        <div class="mx-2 mb-6 sm:mb-0">
            <header>
                <h1
                    class="px-4 text-[28px] font-bold leading-[38px] text-primary sm:text-[42px]"
                >
                    Język angielski online.
                </h1>
                <h2 class="my-7 px-6 text-lg">
                    Gry językowe i praktyczne zadania pomogą Ci utrwalić wiedzę
                    i rozwinąć umiejętności językowe.
                </h2>
            </header>

            <a
                target="_blank"
                :href="`${config.public.appUrl}sign-up`"
                class="mx-auto flex h-fit w-[250px] justify-center rounded-[10px] border-[2px] border-primary px-[14px] py-[10px] text-xl font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
                Rozpocznij teraz
            </a>
        </div>
        <nuxt-img
            src="/images/woman-with-phone.jpeg"
            alt="a woman with phone image"
            class="mx-2 rounded-[50%] shadow-xl"
            sizes="50vw md:360px"
            format="webp"
        />
    </section>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig()
</script>
