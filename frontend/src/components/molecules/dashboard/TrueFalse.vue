<template>
    <div class="my-[20px] w-full">
        <div v-if="currentIndex < words.length">
            <h3
                class="mb-2 mt-10 text-center text-lg font-medium text-gray-900"
            >
                Słówko {{ `${currentIndex + 1}/${words.length}` }}
            </h3>
            <p
                class="mx-auto my-5 max-w-fit rounded-lg border-2 border-gray-200 bg-white p-5 font-bold text-gray-800"
            >
                {{ displayedText }}
            </p>

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

const currentIndex = ref(0);
const currentValue = ref(false);
const answerArray = ref<boolean[]>([]);
const userResponseArray = ref<boolean[]>([]);
const score = ref(0);

const wordsStore = useWordsStore();
const { words } = storeToRefs(wordsStore);
const wordList = ref(shuffleArray(words.value));

const handleIncrement = () => {
    currentIndex.value++;
    userResponseArray.value.push(currentValue.value);

    if (currentIndex.value < wordList.value.length) {
        return;
    }

    userResponseArray.value.map((item, index) => {
        if (item === answerArray.value[index]) score.value++;
    });
};

const midifyWord = (text: string) => {
    const modify = Boolean(Math.round(Math.random()));

    if (!modify) {
        answerArray.value.push(true);

        return text;
    }

    answerArray.value.push(false);
    let changedWord = changeWord(text);

    do {
        changedWord = changeWord(text);
    } while (text === changedWord);

    return changedWord;
};

const changeWord = (word: string) => {
    const aplhabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const decPos = Math.floor(Math.random() * word.length);
    const decAl = Math.floor(Math.random() * word.length);

    return word.slice(0, decPos) + aplhabet[decAl] + word.slice(decPos + 1);
};

const displayedText = computed(
    () =>
        midifyWord(wordList.value[currentIndex.value].word) +
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
