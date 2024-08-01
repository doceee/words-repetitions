<template>
    <v-spinner v-if="wordsStore.isProcessing" />
    <div v-else>
        <page-header title="Powtórki" />

        <ul class="my-3 flex w-full flex-wrap justify-center">
            <li
                v-for="(com, name, index) in components"
                :key="name"
                class="mr-3"
            >
                <button
                    class="inline-block rounded-[10px] border-[3px] bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
                    :class="{
                        underline: name === currentPill
                    }"
                    :disabled="!words.length"
                    @click="setPill(name, index)"
                >
                    {{ com.label }}
                </button>
            </li>
        </ul>

        <the-container>
            <transition
                v-if="words.length"
                enter-active-class="transition duration-300"
                :enter-from-class="
                    forward
                        ? 'translate-x-[40px] opacity-0'
                        : '-translate-x-[40px] opacity-0'
                "
                enter-to-class="translate-x-0 opacity-100"
                leave-from-class="hidden"
                leave-to-class="hidden"
            >
                <component
                    :key="currentPillIndex"
                    :is="components[currentPill].component"
                />
            </transition>
        </the-container>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import VSpinner from '@/components/atoms/VSpinner.vue';
import TheContainer from '@/components/molecules/TheContainer.vue';
import PageHeader from '@/components/atoms/PageHeader.vue';

import { storeToRefs } from 'pinia';
import { useWordsStore } from '@/store/modules/words';

const wordsStore = useWordsStore();

const { words } = storeToRefs(wordsStore);

const components = {
    TrueFalse: {
        component: defineAsyncComponent(
            () => import('../../components/molecules/reviews/TrueFalse.vue')
        ),
        label: 'Prawda/Fałsz'
    },
    WordRevision: {
        component: defineAsyncComponent(
            () => import('../../components/molecules/reviews/WordRevision.vue')
        ),
        label: 'Powtórka słówek'
    },
    FillWord: {
        component: defineAsyncComponent(
            () => import('../../components/molecules/reviews/FillWord.vue')
        ),
        label: 'Uzupełnianie słówek'
    }
};

const currentPill = ref<keyof typeof components>('TrueFalse');
let forward = ref(true);
let currentPillIndex = ref(0);

const setPill = (pill: keyof typeof components, pillIndex: number) => {
    forward.value = pillIndex > currentPillIndex.value;
    currentPillIndex.value = pillIndex;
    currentPill.value = pill;
};

onMounted(() => {
    wordsStore.getWords();
});
</script>
