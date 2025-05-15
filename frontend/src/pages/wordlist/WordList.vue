<template>
    <the-container>
        <div>
            <add-edit-word-modal
                :is-open="isModalOpen"
                :word-id="selectedWordId"
                @close="handleModalClose"
            />
            <div class="mx-1 flex items-end justify-between pt-1 sm:mb-6">
                <v-select
                    v-model="selectedList"
                    :options="wordLists"
                    :disabled="isFetchingWordLists"
                    class="max-w-[260px]"
                    @change="onListChange"
                />
                <v-button @click="() => handleModalOpen()"> Dodaj </v-button>
            </div>

            <v-spinner v-if="wordsStore.isProcessing" />

            <ul
                v-else-if="words.length"
                class="w-full rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900"
            >
                <li
                    v-for="{ id, word, translation } in words"
                    :key="id"
                    class="flex w-full rounded-t-lg border-b border-gray-200 px-4 py-2 font-normal"
                >
                    <span>
                        {{ word + ' - ' + translation }}
                    </span>

                    <v-popover
                        :id="id"
                        class="ml-auto"
                        position="bottom-left"
                        teleport-target="body"
                        :is-open="openPopoverId === id"
                        :active-popover-id="openPopoverId"
                        @update:activePopoverId="openPopoverId = $event"
                        @close="openPopoverId = ''"
                        @open="openPopoverId = id"
                    >
                        <template #trigger="{ isOpen }">
                            <ellipsis-horizontal-icon
                                class="h-6 w-6 rounded-lg p-1 text-gray-600 hover:cursor-pointer hover:bg-gray-200"
                                :class="{ 'bg-gray-200': isOpen }"
                            />
                        </template>
                        <template #tooltip>
                            <ul
                                class="rounded-md border-[1px] border-gray-200 bg-white py-1"
                            >
                                <li
                                    class="flex cursor-pointer px-2 py-1 hover:bg-gray-100"
                                    @click="handleModalOpen(id)"
                                >
                                    Edytuj
                                    <pencil-icon
                                        class="ml-auto h-6 w-6 p-1 text-gray-600"
                                    />
                                </li>
                                <li
                                    class="flex cursor-pointer px-2 py-1 hover:bg-gray-100"
                                    @click="handleMoveWord(id)"
                                >
                                    Prznieś
                                    <arrow-right-circle-icon
                                        class="ml-auto h-6 w-6 p-1 text-gray-600"
                                    />
                                </li>
                                <li
                                    class="flex cursor-pointer px-2 py-1 hover:bg-gray-100"
                                    @click="handleRemoveWord(id)"
                                >
                                    <div> Usuń </div>
                                    <trash-icon
                                        class="ml-auto h-6 w-6 p-1 text-red-600"
                                    />
                                </li>
                            </ul>
                        </template>
                    </v-popover>
                </li>
            </ul>

            <div v-else class="text-md mx-auto px-8 text-left text-gray-700">
                Brak słówek
            </div>
        </div>
    </the-container>
</template>

<script setup lang="ts">
import {
    TrashIcon,
    PencilIcon,
    ArrowRightCircleIcon,
    EllipsisHorizontalIcon
} from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import { toast } from '@/helpers/toast';
import { useWordsStore } from '@/store/modules/words';
import VSpinner from '@/components/atoms/VSpinner.vue';
import { useWordListsStore } from '@/store/modules/word-lists';
import AddEditWordModal from '@/components/molecules/wordlist/AddEditWordModal.vue';
import VButton from '@/components/atoms/VButton.vue';
import VSelect from '@/components/atoms/VSelect.vue';
import VPopover from '@/components/atoms/VPopover.vue';
import TheContainer from '@/components/molecules/TheContainer.vue';
import { WordListType } from '@/types/word';

const wordsStore = useWordsStore();
const wordListsStore = useWordListsStore();
const isModalOpen = ref(false);
const isFetchingWordLists = ref(false);
const openPopoverId = ref('');
const selectedWordId = ref('');
const wordLists = ref<{ label: string; value: string }[]>([]);
const selectedList = ref<null | string>(null);

const { words } = storeToRefs(wordsStore);

const handleModalClose = () => {
    isModalOpen.value = false;
};

const handleModalOpen = (id = '') => {
    selectedWordId.value = id;
    isModalOpen.value = true;
};

const onListChange = (value: string) => {
    selectedList.value = value;
    wordsStore.getUserWords(value);
};

const fetchWordLists = async () => {
    isFetchingWordLists.value = true;

    try {
        const data = await wordListsStore.getWordLists();

        wordLists.value = data.map(item => ({
            label: item.label,
            value: item.name
        }));

        selectedList.value = wordLists.value[0].value;
    } catch (error) {
        console.error(error);
    } finally {
        isFetchingWordLists.value = false;
    }
};

const handleRemoveWord = async (wordId: string) => {
    try {
        await wordsStore.remove(wordId);

        toast('Słówko usunięte', 'success');
    } catch (error) {
        console.error(error);
    }
};

const handleMoveWord = async (wordId: string) => {
    try {
        await wordsStore.move(
            selectedList.value === `${WordListType.current}`
                ? `${WordListType.learned}`
                : `${WordListType.current}`,
            wordId
        );

        toast('Słówko przeniesione', 'success');
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchWordLists();
    wordsStore.getUserWords(selectedList.value || '');
});
</script>
