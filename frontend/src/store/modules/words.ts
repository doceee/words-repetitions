import axios from 'axios';
import { defineStore } from 'pinia';
import type { IWord, IWordState } from '@/types/word';

export const useWordsStore = defineStore('words', {
    state: (): IWordState => {
        return {
            words: [],
            isProcessing: false,
            isFetched: false,
            searchResults: [],
            searchText: ''
        };
    },

    actions: {
        async getWords(): Promise<IWord[]> {
            if (this.isFetched) {
                return this.words;
            }

            this.isProcessing = true;

            try {
                this.words = await axios.get(`/words`);

                this.isFetched = true;
            } catch (error) {
                console.error(error);
            } finally {
                this.isProcessing = false;
            }

            return this.words;
        },

        async destroy(wordId: string) {
            const wordIndex = this.words.findIndex(item => item.id === wordId);

            await axios.delete(`/words/${wordId}`);

            this.words.splice(wordIndex, 1);
        },

        async addWord(word: string, translation: string): Promise<IWord> {
            const data: IWord = await axios.post(`/words`, {
                word,
                translation
            });

            this.words.push(data);

            return data;
        },

        async editWord(
            word: string,
            translation: string,
            id: string
        ): Promise<void> {
            const data: IWord = await axios.put(`/words/${id}`, {
                word,
                translation
            });

            const wordId = this.words.findIndex(item => item.id === id);

            this.words.splice(wordId, 1, data);
        },

        async searchWords(): Promise<void> {
            this.isProcessing = true;

            try {
                this.searchResults = await axios.get(
                    `/words/search/${this.searchText}`
                );
            } catch (error) {
                console.error(error);
            } finally {
                this.isProcessing = false;
            }
        },

        setSearchText(text: string) {
            this.searchText = text;
        }
    }
});
