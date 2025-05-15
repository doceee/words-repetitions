<template>
    <div
        class="relative aspect-[1/1] w-[calc(20%-6.4px)] min-w-[100px] cursor-pointer items-center justify-center shadow-sm transition duration-500 ease-out [transform-style:preserve-3d] hover:shadow-xl"
        :class="{
            '[transform:rotateY(180deg)]': !props.item.clicked
        }"
    >
        <div
            class="absolute h-full w-full rounded-lg border-[3px] border-blue-500 bg-slate-500 [transform:rotateY(180deg)] [backface-visibility:hidden]"
        />

        <div
            class="absolute flex h-full w-full items-center justify-center rounded-lg border-[3px] border-blue-500 bg-slate-100 transition duration-300 [backface-visibility:hidden]"
            :class="{ 'opacity-70': props.item.fixed }"
        >
            {{ props.item.word }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ICardItem } from '@/types/memory-cards';

const props = defineProps<{ item: ICardItem }>();
</script>
