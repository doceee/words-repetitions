<template>
    <div>
        <div v-if="currentIndex < words.length">
            <displayed-word
                :current-index="currentIndex"
                :displayed-text="displayedText"
                :words-length="wordList.length"
            />

            <form @submit.prevent="handleIncrement">
                <v-input
                    v-model="currentValue"
                    class="mx-auto w-full max-w-[400px]"
                />

                <v-button type="submit" class="mx-auto">
                    {{
                        currentIndex === words.length - 1
                            ? 'Zakończ'
                            : 'Następne'
                    }}
                </v-button>
            </form>
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
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import VInput from '@/components/atoms/VInput.vue';
import VButton from '@/components/atoms/VButton.vue';
import { useWordsStore } from '@/store/modules/words';
import { shuffleArray } from '@/helpers/shuffleArray';
import DisplayedWord from '@/components/atoms/DisplayedWord.vue';

const currentIndex = ref(0);
const currentValue = ref('');
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
        if (
            item.word.toLowerCase() ===
            userResponseArray.value[index].toLowerCase()
        )
            score.value++;
    });
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
