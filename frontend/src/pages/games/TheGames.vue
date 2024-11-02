<template>
    <v-spinner v-if="wordsStore.isProcessing" />
    <div v-else>
        <no-words-alert
            v-if="!words.length"
            header="Nie posiadasz zapisanych słówek"
            subheader="Dodaj słówka aby rozpocząć"
            to="word-list"
        />

        <ul class="my-3 flex w-full flex-wrap justify-center">
            <li
                v-for="(com, name, index) in components"
                :key="name"
                class="mr-3"
            >
                <button
                    class="inline-block rounded-[10px] border-[3px] bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
                    :class="{
                        underline: name === currentPill
                    }"
                    :disabled="!words.length"
                    @click="setPill(name, index)"
                >
                    {{ com.label }}
                </button>
            </li>
        </ul>

        <the-container>
            <transition
                v-if="words.length"
                enter-active-class="transition duration-300"
                :enter-from-class="
                    forward
                        ? 'translate-x-[40px] opacity-0'
                        : '-translate-x-[40px] opacity-0'
                "
                enter-to-class="translate-x-0 opacity-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                mode="out-in"
            >
                <component
                    :key="currentPillIndex"
                    :is="components[currentPill].component"
                />
            </transition>
        </the-container>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import VSpinner from '@/components/atoms/VSpinner.vue';
import TheContainer from '@/components/molecules/TheContainer.vue';
import NoWordsAlert from '@/components/atoms/NoWordsAlert.vue';
import TrueFalse from '@/components/molecules/games/TrueFalse.vue';
import { storeToRefs } from 'pinia';
import { useWordsStore } from '@/store/modules/words';

const wordsStore = useWordsStore();

const { words } = storeToRefs(wordsStore);

const components = {
    TrueFalse: {
        component: TrueFalse,
        label: 'Prawda/Fałsz'
    },
    FillWord: {
        component: defineAsyncComponent(
            () => import('../../components/molecules/games/FillWord.vue')
        ),
        label: 'Uzupełnianie słówek'
    },
    MemoryCards: {
        component: defineAsyncComponent(
            () =>
                import(
                    '../../components/molecules/games/memory-cards/MemoryCards.vue'
                )
        ),
        label: 'Dopasowywanie par'
    }
};

const currentPill = ref<keyof typeof components>('TrueFalse');
const forward = ref(true);
const currentPillIndex = ref(0);

const setPill = (pill: keyof typeof components, pillIndex: number) => {
    forward.value = pillIndex > currentPillIndex.value;
    currentPillIndex.value = pillIndex;
    currentPill.value = pill;
};

onMounted(() => {
    wordsStore.getUserWords();
});
</script>
