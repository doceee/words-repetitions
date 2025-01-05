import axios from 'axios';
import { defineStore } from 'pinia';
import type { IWordList } from '@/types/word';

export const useWordListsStore = defineStore('wordLists', {
    actions: {
        getWordLists(): Promise<IWordList[]> {
            return axios.get(`/word-lists`);
        }
    }
});
