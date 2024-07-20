<template>
    <div>
        <add-edit-word-modal
            :is-open="isModalOpen"
            :word-id="selectedWordId"
            @close="handleModalClose"
        />
        <v-button class="my-1 ml-auto mt-1" @click="handleModalOpen('')">
            Dodaj
        </v-button>
        <ul
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
                <pencil-icon
                    class="ml-auto mr-[8px] h-[25px] w-[25px] rounded-lg p-[4px] text-gray-600 hover:cursor-pointer hover:bg-gray-200"
                    @click="handleModalOpen(id)"
                />
                <trash-icon
                    class="h-[25px] w-[25px] rounded-lg p-[4px] text-red-600 hover:cursor-pointer hover:bg-gray-200"
                    @click="deleteWord(id)"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { TrashIcon, PencilIcon } from '@heroicons/vue/20/solid';
import { useWordsStore } from '@/store/modules/words';
import AddEditWordModal from './AddEditWordModal.vue';
import VButton from '@/components/atoms/VButton.vue';
import { toast } from '@/helpers/toast';

const wordsStore = useWordsStore();
const isModalOpen = ref(false);
const selectedWordId = ref('');

const { words } = storeToRefs(wordsStore);

const deleteWord = async (wordId: string) => {
    try {
        await wordsStore.destroy(wordId);

        toast('Słówko usunięte', 'success');
    } catch (error) {
        console.error(error);
    }
};

const handleModalClose = () => {
    isModalOpen.value = false;
};

const handleModalOpen = (id?: string) => {
    selectedWordId.value = id || '';
    isModalOpen.value = true;
};
</script>
