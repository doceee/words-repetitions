<template>
    <nav class="w-full bg-primary">
        <div
            class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 text-center"
        >
            <p
                class="relative inline-block font-rowdies font-extrabold before:absolute before:-inset-1 before:block before:-skew-y-2 before:bg-secondary"
            >
                <span class="relative text-white"> Vocab<br />Master </span>
            </p>

            <a
                target="_blank"
                :href="`${config.public.appUrl}/sign-up`"
                class="flex h-fit justify-center rounded-[10px] border-[2px] border-white bg-primary px-4 py-2 text-[16px] font-bold text-white transition-colors hover:bg-white hover:text-primary"
            >
                Rozpocznij naukę
            </a>
        </div>
    </nav>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
</script>
