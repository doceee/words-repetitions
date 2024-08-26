<template>
    <v-spinner v-if="isProcessing" />
    <div v-else>
        <router-link
            class="group flex w-min items-center hover:cursor-pointer"
            to="/"
        >
            <arrow-left-icon
                class="mr-[8px] h-[18px] text-gray-800 transition group-hover:translate-x-[-5px]"
            />
            powrót
        </router-link>

        <ul class="my-3 flex w-full flex-col">
            <h5 class="mb-[44px] ml-[10px] mt-[12px]">
                Wyniki wyszukiwania dla:
                <i>
                    {{ searchText }}
                </i>
            </h5>
            <li
                v-for="result in searchResults"
                :key="result.translation"
                class="my-[8px] mr-3 flex items-center"
            >
                <span>{{ result.translation }}</span>
                <minus-circle-icon
                    v-if="result.id"
                    class="h-[30px] w-[25px] rounded-lg p-[4px] text-red-600 hover:cursor-pointer hover:bg-gray-200"
                    @click="handleRemoveWord(result.id)"
                />
                <plus-circle-icon
                    v-else
                    class="h-[30px] w-[25px] rounded-lg p-[4px] text-green-600 hover:cursor-pointer hover:bg-gray-200"
                    @click="handleAddWord(result)"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import {
    PlusCircleIcon,
    MinusCircleIcon,
    ArrowLeftIcon
} from '@heroicons/vue/20/solid';
import VSpinner from '@/components/atoms/VSpinner.vue';
import { useWordsStore } from '@/store/modules/words';
import { toast } from '@/helpers/toast';
import type { IWord } from '@/types/word';

const router = useRouter();
const wordsStore = useWordsStore();
const { isProcessing, searchResults, searchText } = storeToRefs(wordsStore);

const handleRemoveWord = async (wordId: string) => {
    try {
        await wordsStore.remove(wordId);

        const resultIndex = searchResults.value.findIndex(
            item => item.id === wordId
        );
        searchResults.value[resultIndex].id = '';

        toast('Słówko usunięte', 'success');
    } catch (error) {
        console.error(error);
    }
};

const handleAddWord = async (word: IWord) => {
    try {
        const createdWord = await wordsStore.addWord(
            word.word,
            word.translation
        );

        const resultIndex = searchResults.value.findIndex(
            item =>
                item.word === word.word && item.translation === word.translation
        );
        searchResults.value[resultIndex].id = createdWord.id;

        toast('Słówko dodane', 'success');
    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    if (!router.currentRoute.value.query.word) {
        return;
    }

    try {
        const text = router.currentRoute.value.query.word.toString();
        wordsStore.setSearchText(text);

        await wordsStore.searchWords();
    } catch (error) {
        console.error(error);
    }
});

onUnmounted(() => wordsStore.setSearchText(''));
</script>
