<template>
    <div>
        <div v-if="currentIndex < words.length">
            <displayed-word
                :current-index="currentIndex"
                :displayed-text="displayedText"
                :words-length="wordList.length"
            />

            <true-false-switch v-model="currentValue" class="my-8" />

            <v-button class="mx-auto" @click="handleIncrement"
                >Następne</v-button
            >
        </div>
        <div v-else>
            <h2
                class="mx-auto mb-3 mt-14 max-w-fit rounded-lg border-2 border-gray-800 bg-white p-5 font-bold text-gray-800"
            >
                Wynik: {{ `${score}/${words.length}` }}
            </h2>
            <v-button class="mx-auto" @click="reset"> Jeszcze raz? </v-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import TrueFalseSwitch from '@/components/atoms/TrueFalseSwitch.vue';
import VButton from '@/components/atoms/VButton.vue';
import { useWordsStore } from '@/store/modules/words';
import { shuffleArray } from '@/helpers/shuffleArray';
import DisplayedWord from '@/components/atoms/DisplayedWord.vue';
import { useUserActivitiesStore } from '@/store/modules/user-activities';
import { ActivityType } from '@/types/user-activity';
import { useStats } from '@/hooks/useStats';

const currentIndex = ref(0);
const currentValue = ref(false);
const answerArray = ref<boolean[]>([]);
const userResponseArray = ref<boolean[]>([]);
const score = ref(0);
const { updateStat } = useStats();

const wordsStore = useWordsStore();
const userActivitiesStore = useUserActivitiesStore();
const { words } = storeToRefs(wordsStore);
const wordList = ref(shuffleArray(words.value));

const handleIncrement = () => {
    currentIndex.value++;
    userResponseArray.value.push(currentValue.value);

    updateStat('reviewedWords', 1);

    if (currentIndex.value < wordList.value.length) {
        return;
    }

    userResponseArray.value.map((item, index) => {
        if (item === answerArray.value[index]) score.value++;
    });

    userActivitiesStore.storeActivity(ActivityType.review);
    updateStat('reviewsDone', 1);
};

const modifyWord = (text: string) => {
    const modify = Boolean(Math.round(Math.random()));

    if (!modify) {
        answerArray.value.push(true);

        return text;
    }

    let changedWord = text;
    let attempts = 0;
    const maxAttempts = 10;

    while (text === changedWord && attempts < maxAttempts) {
        changedWord = changeWord(text);
        attempts++;
    }

    if (text === changedWord) {
        answerArray.value.push(true);
    } else {
        answerArray.value.push(false);
    }
    return changedWord;
};

const changeWord = (word: string) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const decPos = Math.floor(Math.random() * word.length);
    const decAl = Math.floor(Math.random() * alphabet.length);

    return word.slice(0, decPos) + alphabet[decAl] + word.slice(decPos + 1);
};

const displayedText = computed(
    () =>
        modifyWord(wordList.value[currentIndex.value].word) +
        ' - ' +
        wordList.value[currentIndex.value].translation
);

const reset = () => {
    currentIndex.value = 0;
    score.value = 0;
    userResponseArray.value = [];
    answerArray.value = [];
    wordList.value = shuffleArray(wordList.value);
};
</script>
