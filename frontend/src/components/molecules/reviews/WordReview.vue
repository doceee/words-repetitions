<template>
    <div>
        <div v-if="wordList.length">
            <progress-bar
                class="mx-auto max-w-[650px]"
                :max="words.length"
                :value="progress"
            />
            <div
                class="mx-auto mt-[12px] flex w-full max-w-[650px] flex-col items-center justify-center rounded-xl border-[1px] border-gray-700"
            >
                <h1
                    class="mx-auto my-5 max-w-fit rounded-lg p-5 text-xl font-bold text-gray-800"
                >
                    {{ displayedText }}
                </h1>
            </div>
            <div
                v-if="isAnswerDisplayed"
                class="mx-auto mt-[12px] flex w-full max-w-[650px] flex-col rounded-xl bg-white p-[8px] shadow-md"
            >
                <p
                    class="my-[5px] w-full px-[12px] text-lg font-[500]"
                    :class="[
                        isCorrect
                            ? 'bg-green-200 text-green-600'
                            : 'text-red-600'
                    ]"
                >
                    {{ currentValue }}
                </p>
                <p class="my-[5px] w-full px-[12px] text-lg font-[500]">
                    {{ wordList[currentIndex].word }}
                </p>
            </div>
            <v-input
                v-else
                v-model="currentValue"
                non-static-error
                class="mx-auto my-[18px] w-full max-w-[400px] sm:my-[38px]"
            />
            <review-footer
                class="my-[18px]"
                :answer-revealed="isAnswerDisplayed"
                @check="handleCheck"
                @good="handleGoodResponse"
                @bad="handleBadResponse"
                @hint="handleHint"
            />
        </div>
        <div
            v-else
            class="mx-auto mb-2 mt-4 flex w-full max-w-[450px] flex-col p-[8px]"
        >
            <h1 class="mx-auto mb-4 text-center text-xl font-[700]">
                Powtórki ukoczone!
            </h1>
            <p class="w-full rounded-lg bg-green-200 p-3">
                Powtórzone elementy: {{ words.length }}
            </p>
            <img
                :src="GirlReading"
                class="mx-auto my-6 w-full max-w-[140px]"
                alt="a girl reading a book image"
            />
            <v-button class="group mt-6 flex items-center" to="/">
                <arrow-left-icon
                    class="mr-[8px] h-[18px] text-gray-800 transition group-hover:translate-x-[-5px]"
                />
                powrót na stronę główną
            </v-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import VInput from '@/components/atoms/VInput.vue';
import { useWordsStore } from '@/store/modules/words';
import { shuffleArray } from '@/helpers/shuffleArray';
import ProgressBar from '@/components/atoms/ProgressBar.vue';
import { useUserActivitiesStore } from '@/store/modules/user-activities';
import { ActivityType } from '@/types/user-activity';
import { useStats } from '@/hooks/useStats';
import ReviewFooter from './ReviewFooter.vue';
import VButton from '@/components/atoms/VButton.vue';
import GirlReading from '@/assets/images/girl_reading_book.svg';
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';

const currentIndex = ref(0);
const currentValueIndex = ref(0);
const isAnswerDisplayed = ref(false);
const isCorrect = ref(false);
const currentValue = ref('');
const wordsStore = useWordsStore();
const userActivitiesStore = useUserActivitiesStore();
const { words } = storeToRefs(wordsStore);
const wordList = ref(shuffleArray(words.value));
const progress = computed(() => words.value.length - wordList.value.length);

const { updateStat } = useStats();

const handleBadResponse = () => {
    updateStat('reviewedWords', 1);
    wordList.value.push(
        wordList.value.splice(
            wordList.value.indexOf(wordList.value[currentIndex.value]),
            1
        )[0]
    );
    isAnswerDisplayed.value = false;
    currentValue.value = '';
};

const handleGoodResponse = () => {
    updateStat('reviewedWords', 1);

    if (currentIndex.value === wordList.value.length - 1) {
        wordList.value.length = 0;
        userActivitiesStore.storeActivity(ActivityType.Review);
        updateStat('reviewsDone', 1);

        return;
    }

    wordList.value = wordList.value.filter(
        item => item.id !== wordList.value[currentIndex.value].id
    );
    isAnswerDisplayed.value = false;
    currentValue.value = '';
};

const handleHint = () => {
    if (!currentValue.value.length) {
        currentValueIndex.value = 1;
    } else if (currentValue.value.length) {
        currentValueIndex.value = 0;

        for (let i = 0; i < currentValue.value.length + 1; i++) {
            if (
                currentValue.value[i] !==
                wordList.value[currentIndex.value].word[i]
            ) {
                currentValueIndex.value++;

                break;
            }

            currentValueIndex.value++;
        }
    }

    if (
        currentValueIndex.value ===
        wordList.value[currentIndex.value].word.length
    ) {
        handleCheck();
    }

    currentValue.value = wordList.value[currentIndex.value].word.slice(
        0,
        currentValueIndex.value
    );
};

const handleCheck = () => {
    isAnswerDisplayed.value = true;
    isCorrect.value =
        wordList.value[currentIndex.value].word === currentValue.value;
};

const displayedText = computed(
    () => wordList.value[currentIndex.value].translation
);
</script>
