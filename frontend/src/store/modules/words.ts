import axios from 'axios';
import { defineStore } from 'pinia';
import type { IWord, IWordState } from '@/types/word';
import { getSavedState } from '@/helpers/storage';

export const useWordsStore = defineStore('words', {
    state: (): IWordState => {
        return {
            words: [],
            isProcessing: true,
            isFetched: false,
            searchResults: [],
            searchText: '',
            wordList: ''
        };
    },

    actions: {
        async getUserWords(wordList = ''): Promise<IWord[]> {
            if (this.isFetched && this.wordList === wordList) {
                return this.words;
            }

            const params: Record<string, string | number> = {};

            if (wordList) {
                params.wordList = wordList;
            }

            this.isProcessing = true;

            try {
                const loggedUser = getSavedState('user');

                this.words = await axios.get(`/words/user/${loggedUser?.id}`, {
                    params
                });

                this.wordList = wordList;
                this.isFetched = true;
            } catch (error) {
                console.error(error);
            } finally {
                this.isProcessing = false;
            }

            return this.words;
        },

        async getWords(limit = 10, level = ''): Promise<IWord[]> {
            const params: Record<string, string | number> = { limit };

            if (level) {
                params.level = level;
            }

            const data: IWord[] = await axios.get(`/words`, { params });

            return data;
        },

        async remove(wordId: string) {
            try {
                const wordIndex = this.words.findIndex(
                    item => item.id === wordId
                );

                await axios.delete(`/words/${wordId}`);

                if (~wordIndex) this.words.splice(wordIndex, 1);
            } catch (error) {
                console.error(error);
            }
        },

        async move(wordList: string, wordId: string) {
            try {
                const wordIndex = this.words.findIndex(
                    item => item.id === wordId
                );

                await axios.post('/words/move', {
                    wordList,
                    wordIds: [wordId]
                });

                if (~wordIndex) this.words.splice(wordIndex, 1);
            } catch (error) {
                console.error(error);
            }
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
            try {
                const data: IWord = await axios.put(`/words/${id}`, {
                    word,
                    translation
                });

                const wordId = this.words.findIndex(item => item.id === id);

                if (~wordId) this.words.splice(wordId, 1, data);
            } catch (error) {
                console.error(error);
            }
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
