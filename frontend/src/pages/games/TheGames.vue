<template>
    <v-spinner v-if="wordsStore.isProcessing" />
    <div v-else>
        <no-words-alert
            v-if="!words.length"
            header="Nie posiadasz zapisanych słówek"
            subheader="Dodaj słówka aby rozpocząć"
            to="word-list"
        />
        <ul class="my-3 flex w-full flex-wrap justify-center">
            <li
                v-for="(com, name, index) in components"
                :key="com.label"
                class="mr-3"
            >
                <button
                    class="inline-block rounded-[10px] border-[3px] bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
                    :class="{
                        underline: name === currentPill
                    }"
                    @click="setPill(name, index)"
                >
                    {{ com.label }}
                </button>
            </li>
        </ul>

        <the-container v-if="words.length">
            <component
                :key="currentPillIndex"
                :is="components[currentPill]?.component || 'div'"
            />
        </the-container>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from 'vue';

import VSpinner from '@/components/atoms/VSpinner.vue';
import { useWordsStore } from '@/store/modules/words';
import NoWordsAlert from '@/components/atoms/NoWordsAlert.vue';
import TheContainer from '@/components/molecules/TheContainer.vue';
import TrueFalse from '@/components/molecules/games/TrueFalse.vue';

const wordsStore = useWordsStore();
const words = computed(() => wordsStore.words);

const components = {
    TrueFalse: {
        component: TrueFalse,
        label: 'Prawda/Fałsz'
    },
    FillWord: {
        component: defineAsyncComponent(
            () => import('../../components/molecules/games/FillWord.vue')
        ),
        label: 'Uzupełnianie słówek'
    },
    MemoryCards: {
        component: defineAsyncComponent(
            () =>
                import(
                    '../../components/molecules/games/memory-cards/MemoryCards.vue'
                )
        ),
        label: 'Dopasowywanie par'
    }
};

const currentPill = ref<keyof typeof components>('TrueFalse');
const currentPillIndex = ref(0);

const setPill = (pill: keyof typeof components, pillIndex: number) => {
    currentPillIndex.value = pillIndex;
    currentPill.value = pill;
};

onMounted(() => {
    wordsStore.getUserWords();
});
</script>
