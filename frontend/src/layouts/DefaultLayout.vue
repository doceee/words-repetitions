<template>
    <div class="flex h-full bg-primary">
        <div class="flex flex-1 flex-col overflow-hidden">
            <top-bar />

            <div
                class="h-full w-full overflow-y-auto px-4 pb-6 sm:px-6 md:px-8 lg:pb-10 lg:pl-[48px] lg:pr-[50px] xl:pl-[88px] xl:pr-[92px] 2xl:pl-[124px] 2xl:pr-[132px]"
            >
                <main class="flex min-h-full flex-col pt-4 lg:pt-5">
                    <div class="mx-auto my-3 w-full max-w-4xl">
                        <slot />
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import TopBar from '@/components/organisms/TopBar.vue';
</script>
