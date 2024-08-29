<template>
    <section
        class="mx-auto my-[70px] flex w-full max-w-4xl items-center justify-center px-[12px]"
    >
        <div class="px-[12px] text-left">
            <header>
                <h1
                    class="text-left text-[42px] font-bold leading-[38px] text-primary"
                >
                    Język angielski online.
                </h1>
                <h2 class="my-[28px] px-[25px]">
                    Gry językowe i praktyczne zadania pomogą Ci utrwalić wiedzę
                    i rozwinąć umiejętności językowe.
                </h2>
            </header>

            <a
                target="_blank"
                :href="`${config.public.appUrl}sign-up`"
                class="mx-auto flex h-fit w-[250px] justify-center rounded-[10px] border-[2px] border-primary px-[8px] py-[4px] text-[16px] font-bold text-primary hover:bg-primary hover:text-white"
            >
                Rozpocznij teraz
            </a>
        </div>
        <nuxt-img
            src="/images/woman-with-phone.jpeg"
            alt="a woman with phone image"
            class="rounded-[50%] shadow-xl"
            width="360"
            height="360"
            format="webp"
        />
    </section>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig()
</script>
