<template>
    <v-spinner v-if="wordsStore.isProcessing" />
    <div v-else>
        <page-header title="Powtórki" />

        <ul class="my-3 flex w-full flex-wrap justify-center">
            <li v-for="(com, index) in components" :key="com.text" class="mr-3">
                <button
                    class="inline-block rounded-[10px] border-[3px] bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
                    :class="{
                        underline: com.text === currentPill
                    }"
                    :disabled="!words.length"
                    @click="setPill(com.text, index)"
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
                    :is="components[currentPill][currentPill]"
                />
            </transition>
        </the-container>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VSpinner from '@/components/atoms/VSpinner.vue';
import TrueFalse from '@/components/molecules/reviews/TrueFalse.vue';
import WordRevision from '@/components/molecules/reviews/WordRevision.vue';
import FillWord from '@/components/molecules/reviews/FillWord.vue';
import TheContainer from '@/components/molecules/TheContainer.vue';
import PageHeader from '@/components/atoms/PageHeader.vue';

import { storeToRefs } from 'pinia';
import { useWordsStore } from '@/store/modules/words';

const wordsStore = useWordsStore();

const { words } = storeToRefs(wordsStore);
const components = {
    TrueFalse: { TrueFalse, text: 'TrueFalse', label: 'Prawda/Fałsz' },
    WordRevision: {
        WordRevision,
        text: 'WordRevision',
        label: 'Powtórka słówek'
    },
    FillWord: { FillWord, text: 'FillWord', label: 'Uzupełnianie słówek' }
};

const currentPill = ref('TrueFalse');
let forward = ref(true);
let currentPillIndex = ref(0);

const setPill = (pill, pillIndex) => {
    forward.value = pillIndex > currentPillIndex.value;
    currentPillIndex.value = pillIndex;
    currentPill.value = pill;
};

onMounted(() => {
    wordsStore.getWords();
});
</script>
