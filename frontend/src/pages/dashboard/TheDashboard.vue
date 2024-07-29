<template>
    <v-spinner v-if="isProcessing" />
    <div v-else>
        <ul class="my-3 flex w-full flex-wrap justify-center">
            <li v-for="(com, index) in components" :key="com.text" class="mr-3">
                <button
                    class="inline-block rounded-[10px] border-[3px] bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
                    :class="{
                        underline: com.text === currentPill
                    }"
                    :disabled="isPillDisabled(com.text)"
                    @click="setPill(com.text, index)"
                >
                    {{ com.label }}
                </button>
            </li>
        </ul>
        <the-container>
            <transition
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
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import VSpinner from '@/components/atoms/VSpinner.vue';
import { useWordsStore } from '@/store/modules/words';
import WordList from '@/components/molecules/dashboard/WordList.vue';
import TrueFalse from '@/components/molecules/dashboard/TrueFalse.vue';
import WordRevision from '@/components/molecules/dashboard/WordRevision.vue';
import FillWord from '@/components/molecules/dashboard/FillWord.vue';
import TheContainer from '@/components/molecules/dashboard/TheContainer.vue';

const isProcessing = ref(false);
const wordsStore = useWordsStore();
const { words } = storeToRefs(wordsStore);
const components = {
    WordList: { WordList, text: 'WordList', label: 'Lista słówek' },
    TrueFalse: { TrueFalse, text: 'TrueFalse', label: 'Prawda/Fałsz' },
    WordRevision: {
        WordRevision,
        text: 'WordRevision',
        label: 'Powtórka słówek'
    },
    FillWord: { FillWord, text: 'FillWord', label: 'Uzupełnianie słówek' }
};

const currentPill = ref('WordList');
let forward = ref(true);
let currentPillIndex = ref(0);

const setPill = (pill, pillIndex) => {
    forward.value = pillIndex > currentPillIndex.value;
    currentPillIndex.value = pillIndex;
    currentPill.value = pill;
};

const isPillDisabled = pill => {
    if (pill === 'WordList') return false;

    return !words.value.length;
};

onMounted(async () => {
    isProcessing.value = true;

    try {
        await wordsStore.getWords();
    } catch (error) {
        console.error(error);
    } finally {
        isProcessing.value = false;
    }
});
</script>
