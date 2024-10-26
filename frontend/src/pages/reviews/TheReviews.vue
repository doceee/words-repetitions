<template>
    <v-spinner v-if="wordsStore.isProcessing" />
    <no-words-alert
        v-else-if="!wordsStore.words.length"
        header="Nie posiadasz zapisanych słówek"
        subheader="Dodaj słówka aby rozpocząć"
        to="word-list"
    />
    <the-container v-else>
        <word-review />
    </the-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import VSpinner from '@/components/atoms/VSpinner.vue';
import TheContainer from '@/components/molecules/TheContainer.vue';
import { useWordsStore } from '@/store/modules/words';
import WordReview from '@/components/molecules/reviews/WordReview.vue';
import NoWordsAlert from '@/components/atoms/NoWordsAlert.vue';

const wordsStore = useWordsStore();

onMounted(() => {
    wordsStore.getWords();
});
</script>
