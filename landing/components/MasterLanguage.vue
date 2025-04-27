<template>
    <section
        class="mx-auto my-20 flex w-full max-w-4xl flex-col items-center justify-center text-center sm:flex-row sm:text-left md:text-center"
    >
        <div class="mx-2 mb-6 sm:mb-0">
            <header>
                <h1 class="px-4 text-3xl/10 font-bold text-primary sm:text-5xl">
                    Język angielski online.
                </h1>
                <h2 class="my-7 px-6 text-lg">
                    Gry językowe i praktyczne zadania pomogą Ci utrwalić wiedzę
                    i rozwinąć umiejętności językowe.
                </h2>
            </header>

            <a
                target="_blank"
                :href="`${config.public.appUrl}/sign-up`"
                class="mx-auto flex h-fit w-[250px] justify-center rounded-lg border-[2px] border-primary px-[14px] py-[10px] text-xl font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
                Rozpocznij teraz
            </a>
        </div>
        <nuxt-img
            src="/images/woman-with-phone.webp"
            alt="A woman holding a phone"
            class="m-auto mx-2 h-[60vw] w-[60vw] rounded-full px-1 shadow-xl sm:h-[360px] sm:w-[360px]"
            :width="360"
            :height="360"
        />
    </section>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
</script>
