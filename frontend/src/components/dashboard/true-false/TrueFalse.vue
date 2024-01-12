<template>
  <div class="my-[20px] w-full">
    <div v-if="currentIndex < words.length">
      <h3
        class="mb-2 mt-10 text-center text-lg font-medium text-gray-900 dark:text-white"
      >
        Słówko {{ currentIndex + 1 + '/' + words.length }}
      </h3>
      <p
        class="mx-auto my-5 max-w-fit rounded-lg border-2 border-gray-200 bg-white p-5 font-bold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
      >
        {{ displayedText }}
      </p>

      <true-false-switch v-model="currentValue" class="my-8" />

      <the-button class="mx-auto" @click="handleIncrement">Następne</the-button>
    </div>
    <div v-else>
      <h2
        class="mx-auto mb-3 mt-14 max-w-fit rounded-lg border-2 border-gray-800 bg-white p-5 font-bold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
      >
        Wynik: {{ score + '/' + words.length }}
      </h2>
      <the-button class="mx-auto" @click="reset"> Jeszcze raz? </the-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import TrueFalseSwitch from './TrueFalseSwitch.vue';
import TheButton from '@/components/TheButton.vue';
import { useWordsStore } from '@/store/modules/words';
import { storeToRefs } from 'pinia';
import { shuffleArray } from '@/helpers/shuffleArray';

const currentValue = ref(false);
const currentIndex = ref(0);
const answerArray = ref<boolean[]>([]);
const responseArray = ref<boolean[]>([]);
const score = ref(0);

const wordsStore = useWordsStore();
const { words } = storeToRefs(wordsStore);
const wordList = ref(shuffleArray(words.value));

const handleIncrement = () => {
  currentIndex.value++;
  responseArray.value.push(currentValue.value);

  if (currentIndex.value < wordList.value.length) {
    return;
  }

  responseArray.value.map((item, index) => {
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
  responseArray.value = [];
  answerArray.value = [];
  wordList.value = shuffleArray(wordList.value);
};
</script>
