<template>
    <div>
        <div v-if="currentIndex < wordList.length" class="mb-8 mt-2">
            <displayed-word
                :current-index="currentIndex"
                :displayed-text="displayedText"
                :words-length="wordList.length"
            />

            <input
                id="answer"
                v-model="currentValue"
                class="mx-auto block w-5/6 rounded-md border border-gray-300 focus:ring-gray-600 sm:max-w-[400px]"
                :class="inputClass"
                placeholder="Tłumaczenie"
                @input="handleInput"
            />
        </div>
        <div v-else>
            <div class="mx-auto my-10 flex justify-center">
                <v-button @click="reset"> Jeszcze raz? </v-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useWordsStore } from '@/store/modules/words';
import { useUserActivitiesStore } from '@/store/modules/user-activities';
import VButton from '@/components/atoms/VButton.vue';
import { shuffleArray } from '@/helpers/shuffleArray';
import DisplayedWord from '@/components/atoms/DisplayedWord.vue';
import { ActivityType } from '@/types/user-activity';
import { useStats } from '@/hooks/useStats';

const currentIndex = ref(0);
const currentValue = ref('');
const inputClass = ref<string[]>([]);
const correctValueClass = 'shadow-green-500';
const incorrectValueClass = 'shadow-red-500';

const { updateStat } = useStats();
const wordsStore = useWordsStore();
const userActivitiesStore = useUserActivitiesStore();

const { words } = storeToRefs(wordsStore);

const wordList = ref(shuffleArray(words.value));

const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    const correctWord = wordList.value[currentIndex.value].word.toLowerCase();

    inputClass.value = [];

    if (!val) {
        return;
    }

    for (let i = 0; i < Math.min(val.length, correctWord.length); i++) {
        if (val[i]?.toLowerCase() === correctWord[i]) {
            inputClass.value = [
                'shadow-[0px_0px_30px_0px_rgba(0,0,0,1)]',
                correctValueClass
            ];
        } else {
            inputClass.value = [
                'shadow-[0px_0px_30px_0px_rgba(0,0,0,1)]',
                incorrectValueClass
            ];
            break;
        }
    }

    if (
        wordList.value[currentIndex.value].word.toLowerCase() ===
        val.toLowerCase()
    ) {
        updateStat('reviewedWords', 1);
        currentIndex.value++;
        currentValue.value = '';
        inputClass.value = [];

        if (currentIndex.value === wordList.value.length) {
            userActivitiesStore.storeActivity(ActivityType.review);
            updateStat('reviewsDone', 1);
        }
    }
};

const displayedText = computed(() => {
    if (currentIndex.value < wordList.value.length) {
        return wordList.value[currentIndex.value].translation;
    }

    return '';
});

const reset = () => {
    currentIndex.value = 0;
    wordList.value = shuffleArray(wordList.value);
};
</script>
