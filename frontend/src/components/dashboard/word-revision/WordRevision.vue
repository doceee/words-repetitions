<template>
  <div class="my-[20px] w-full">
    <div v-if="currentIndex < words.length">
      <h3
        class="mb-2 mt-10 text-center text-lg font-medium text-gray-900 dark:text-white"
      >
        Słówko {{ currentIndex + 1 + '/' + words.length }}
      </h3>
      <p
        class="mx-auto my-5 max-w-fit rounded-lg border-2 border-gray-200 bg-white p-5 font-bold text-gray-800"
      >
        {{ displayedText }}
      </p>

      <form @submit.prevent="handleIncrement">
        <the-input
          v-model="currentValue"
          class="mx-auto w-full max-w-[400px]"
        />

        <the-button type="submit" class="mx-auto">
          {{ currentIndex === words.length - 1 ? 'Zakończ' : 'Następne' }}
        </the-button>
      </form>
    </div>
    <div v-else>
      <h2
        class="mx-auto mb-3 mt-14 max-w-fit rounded-lg border-2 border-gray-800 bg-white p-5 font-bold text-gray-800"
      >
        Wynik: {{ score + '/' + words.length }}
      </h2>
      <the-button class="mx-auto" @click="reset"> Jeszcze raz? </the-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import TheInput from '@/components/TheInput.vue';
import TheButton from '@/components/TheButton.vue';
import { useWordsStore } from '@/store/modules/words';
import { storeToRefs } from 'pinia';
import { shuffleArray } from '@/helpers/shuffleArray';

const currentValue = ref('');
const currentIndex = ref(0);
const answerArray = ref<boolean[]>([]);
const userResponseArray = ref<string[]>([]);
const score = ref(0);

const wordsStore = useWordsStore();
const { words } = storeToRefs(wordsStore);
const wordList = ref(shuffleArray(words.value));

const handleIncrement = () => {
  currentIndex.value++;
  userResponseArray.value.push(currentValue.value.toLowerCase());
  currentValue.value = '';

  if (currentIndex.value < wordList.value.length) {
    return;
  }

  wordList.value.map((item, index) => {
    if (item.word === userResponseArray.value[index]) score.value++;
  });
};

const displayedText = computed(
  () => wordList.value[currentIndex.value].translation
);

const reset = () => {
  currentIndex.value = 0;
  score.value = 0;
  userResponseArray.value = [];
  answerArray.value = [];
  wordList.value = shuffleArray(wordList.value);
};
</script>
