<template>
    <div class="my-[20px] w-full">
        <div v-if="currentIndex < wordList.length">
            <h3
                class="mb-2 mt-10 text-center text-lg font-medium text-gray-900"
            >
                Słówko {{ `${currentIndex + 1}/${wordList.length}` }}
            </h3>
            <p
                class="mx-auto my-5 max-w-fit rounded-lg border-2 border-gray-200 bg-white p-5 font-bold text-gray-800"
            >
                {{ displayedText }}
            </p>

            <input
                id="answer"
                v-model="currentValue"
                class="mx-auto block w-full max-w-[400px] rounded-md border border-gray-300 focus:ring-gray-600"
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
import VButton from '@/components/atoms/VButton.vue';
import { shuffleArray } from '@/helpers/shuffleArray';

const score = ref(0);
const currentIndex = ref(0);
const currentValue = ref('');
const inputClass = ref('');
const userResponseArray = ref<string[]>([]);
const correctValueClass = 'shadow-green-500';
const incorrectValueClass = 'shadow-red-500';

const wordsStore = useWordsStore();

const { words } = storeToRefs(wordsStore);

const wordList = ref(shuffleArray(words.value));

const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;

    inputClass.value = '';

    if (!val) {
        return;
    }

    for (let i = 0; i < val.length; i++) {
        if (
            val[i].toLowerCase() ===
            wordList.value[currentIndex.value].word[i].toLowerCase()
        ) {
            inputClass.value =
                'shadow-[0px_0px_30px_0px_rgba(0,0,0,1)] ' + correctValueClass;
        } else if (
            val[i].toLowerCase() !==
            wordList.value[currentIndex.value].word[i].toLowerCase()
        ) {
            inputClass.value =
                'shadow-[0px_0px_30px_0px_rgba(0,0,0,1)] ' +
                incorrectValueClass;
        }
    }

    if (
        wordList.value[currentIndex.value].word.toLowerCase() ===
        val.toLowerCase()
    ) {
        currentIndex.value++;
        currentValue.value = '';
        inputClass.value = '';
    }
};

const displayedText = computed(
    () => wordList.value[currentIndex.value].translation
);

const reset = () => {
    currentIndex.value = 0;
    score.value = 0;
    userResponseArray.value = [];
    wordList.value = shuffleArray(wordList.value);
};
</script>
