<template>
    <div
        class="flex items-center justify-center"
        :class="{ isLoading: 'opacity-50' }"
    >
        <template v-if="!props.answerRevealed">
            <v-button
                class="mx-3 w-[200px]"
                button-type="gray"
                rounded
                :is-disabled="isLoading"
                @click="emit('hint')"
            >
                Podpowiedź
            </v-button>
            <v-button
                class="mx-3 w-[200px]"
                rounded
                :is-disabled="isLoading"
                @click="emit('check')"
            >
                Sprawdzam
            </v-button>
        </template>
        <template v-else>
            <v-button
                class="mx-3 w-[200px]"
                button-type="danger"
                rounded
                :is-disabled="isLoading"
                @click="emit('bad')"
            >
                Źle
            </v-button>
            <v-button
                class="mx-3 w-[200px]"
                button-type="success"
                rounded
                :is-disabled="isLoading"
                @click="emit('good')"
            >
                Świetnie
            </v-button>
        </template>
    </div>
</template>

<script setup lang="ts">
import VButton from '@/components/atoms/VButton.vue';

const props = defineProps({
    answerRevealed: Boolean,
    isLoading: Boolean
});

const emit = defineEmits(['check', 'hint', 'good', 'bad']);
</script>
