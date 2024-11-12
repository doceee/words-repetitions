<template>
    <v-spinner v-if="wordsStore.isProcessing" />

    <div v-else>
        <the-container>
            <word-list />
        </the-container>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import VSpinner from '@/components/atoms/VSpinner.vue';
import { useWordsStore } from '@/store/modules/words';
import WordList from '@/components/molecules/wordlist/WordList.vue';
import TheContainer from '@/components/molecules/TheContainer.vue';

const wordsStore = useWordsStore();

onMounted(() => {
    wordsStore.getUserWords();
});
</script>
