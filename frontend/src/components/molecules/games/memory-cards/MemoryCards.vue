<template>
    <div
        class="mx-auto mt-8 w-full max-w-[768px]"
        :class="[isProcessing ? '' : 'overflow-x-auto']"
    >
        <div
            class="mb-4 flex w-full items-center justify-between rounded-xl bg-white px-4 py-2"
        >
            <v-select
                v-model="wordLevel"
                :disabled="isProcessing"
                :options="levelOptions"
                class="w-full max-w-[260px]"
                @change="fetchWords"
            />

            <p>CZAS: {{ formatTime(gameTime) }}</p>
        </div>

        <v-spinner v-if="isProcessing" />

        <template v-else>
            <div
                v-if="shuffledArray.length"
                class="relative flex w-full min-w-[600px] flex-wrap gap-2 overflow-x-auto"
                :class="{ 'items-center justify-center': isCompleted }"
            >
                <template v-if="isCompleted">
                    <div
                        class="absolute z-10 flex h-full w-full items-center justify-center rounded-lg bg-primary opacity-60"
                    />
                    <v-button
                        class="absolute z-20 self-center justify-self-center"
                        @click="restartGame"
                    >
                        Jeszcze raz?
                    </v-button>
                </template>

                <memory-card
                    v-for="item in shuffledArray"
                    :item="item"
                    :key="item.id"
                    @click="handleCardClick(item)"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent } from 'vue';
import { shuffleArray } from '@/helpers/shuffleArray';
import VButton from '@/components/atoms/VButton.vue';
import type { ICardItem, IMemoryCardsData } from '@/types/memory-cards';
import MemoryCard from './MemoryCard.vue';
import VSpinner from '@/components/atoms/VSpinner.vue';
import { useWordsStore } from '@/store/modules/words';
import VSelect from '@/components/atoms/VSelect.vue';
import { mapActions } from 'pinia';

export default defineComponent({
    name: 'MemoryCards',

    components: { VButton, MemoryCard, VSpinner, VSelect },

    data(): IMemoryCardsData {
        return {
            shuffledArray: [],
            selectedCards: [],
            isCompleted: false,
            isProcessing: true,
            wordLevel: 'easy',
            timer: null,
            gameTime: 0,
            levelOptions: [
                { label: 'Poziom łatwy', value: 'easy' },
                { label: 'Poziom średniozaawansowany', value: 'intermediate' },
                { label: 'Poziom zaawansowany', value: 'advanced' }
            ]
        };
    },

    created() {
        this.fetchWords();
    },

    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },

    methods: {
        ...mapActions(useWordsStore, ['getWords']),

        handleCardClick(cardItem: ICardItem) {
            if (
                cardItem.fixed ||
                cardItem.clicked ||
                this.selectedCards.length === 2
            )
                return;

            const foundItem = this.shuffledArray.find(
                i => i.id === cardItem.id && cardItem.word === i.word
            );

            if (!foundItem) return;

            foundItem.clicked = true;
            this.selectedCards.push(foundItem);

            if (this.selectedCards.length < 2) return;

            const isValidMatch = this.checkMatch();

            setTimeout(() => {
                this.shuffledArray.map(item => {
                    if (this.selectedCards[0].id === item.id && isValidMatch) {
                        item.fixed = true;

                        return item;
                    }

                    if (!item.fixed) {
                        item.clicked = false;
                    }

                    return item;
                });
                this.selectedCards.length = 0;

                if (this.shuffledArray.every(i => i.fixed)) {
                    this.isCompleted = true;

                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                }
            }, 600);
        },

        checkMatch() {
            return (
                this.selectedCards.length === 2 &&
                this.selectedCards[0].id === this.selectedCards[1].id
            );
        },

        async restartGame() {
            const arr = this.shuffledArray.map(item => ({
                ...item,
                fixed: false,
                clicked: false
            }));
            this.shuffledArray.length = 0;

            await this.$nextTick();

            this.shuffledArray = shuffleArray(arr);
            this.isCompleted = false;
            this.gameTime = 0;
            this.timer = setInterval(() => {
                this.gameTime += 1;
            }, 1000);
        },

        formatTime(seconds: number) {
            return dayjs()
                .startOf('day')
                .add(seconds, 'second')
                .format('mm:ss');
        },

        async fetchWords() {
            if (this.timer) {
                this.gameTime = 0;
                clearInterval(this.timer);
            }

            this.isProcessing = true;

            try {
                const res = await this.getWords(10, this.wordLevel);

                let arr: ICardItem[] = [];
                res.forEach(item => {
                    arr.push(
                        {
                            word: item.word,
                            id: item.id,
                            clicked: false,
                            fixed: false
                        },
                        {
                            word: item.translation,
                            id: item.id,
                            clicked: false,
                            fixed: false
                        }
                    );
                });

                this.shuffledArray = shuffleArray(arr);
            } catch (error) {
                console.error(error);
            } finally {
                this.isProcessing = false;
                this.timer = setInterval(() => {
                    this.gameTime += 1;
                }, 1000);
            }
        }
    }
});
</script>
