<template>
    <v-spinner v-if="wordsStore.isProcessing" />
    <div v-else>
        <the-container>
            <word-review />
        </the-container>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import VSpinner from '@/components/atoms/VSpinner.vue';
import TheContainer from '@/components/molecules/TheContainer.vue';
import { useWordsStore } from '@/store/modules/words';
import WordReview from '@/components/molecules/reviews/WordReview.vue';

const wordsStore = useWordsStore();

onMounted(() => {
    wordsStore.getWords();
});
</script>
