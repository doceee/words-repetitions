<template>
  <the-spinner v-if="isProcessing" />
  <div v-else>
    <ul class="my-3 flex w-full flex-wrap justify-center">
      <li v-for="pill in pills" :key="pill.text" class="mr-3">
        <button
          class="inline-block rounded-[10px] border-[3px] bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
          :class="{
            'border-blue-700': pill.text === activePill
          }"
          :disabled="isPillDisabled(pill.text)"
          @click="setPill(pill.text)"
        >
          {{ pill.label }}
        </button>
      </li>
    </ul>

    <word-list v-if="activePill === 'words'" />
    <true-false v-else-if="activePill === 'true-false'" />
    <word-revision v-else-if="activePill === 'word-revision'" />
    <fill-word v-else-if="activePill === 'fill-word'" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import TheSpinner from '@/components/TheSpinner.vue';
import { useWordsStore } from '@/store/modules/words';
import WordList from '@/components/dashboard/word-list/WordList.vue';
import TrueFalse from '@/components/dashboard/true-false/TrueFalse.vue';
import WordRevision from '@/components/dashboard/word-revision/WordRevision.vue';
import FillWord from '@/components/dashboard/fill-word/FillWord.vue';
import { toast } from '@/helpers/toast';

const isProcessing = ref(false);
const wordsStore = useWordsStore();
const { words } = storeToRefs(wordsStore);

const pills = ref([
  { text: 'words', label: 'Lista słówek' },
  { text: 'true-false', label: 'Prawda/Fałsz' },
  { text: 'word-revision', label: 'Powtórka słówek' },
  { text: 'fill-word', label: 'Uzupełnianie słówek' }
]);
const activePill = ref(pills.value[0].text);

const setPill = (pill: string) => {
  const wordsRequired = ['true-false', 'word-revision', 'fill-word'];

  if (wordsRequired.includes(pill) && !wordsStore.words.length) {
    toast('Dodaj słówka do listy żeby rozpocząć powtórki', 'error');

    return;
  }

  activePill.value = pill;
};

const isPillDisabled = (pillText: string) => {
  if (pillText === 'words') return false;

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
