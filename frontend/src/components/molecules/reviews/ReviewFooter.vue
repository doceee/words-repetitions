<template>
    <div class="flex items-center justify-center">
        <template v-if="!props.answerRevealed">
            <v-button
                class="mx-[12px] w-[200px]"
                button-type="gray"
                rounded
                @click="$emit('hint')"
            >
                Podpowiedź
            </v-button>
            <v-button
                class="mx-[12px] w-[200px]"
                rounded
                @click="$emit('check')"
            >
                Sprawdzam
            </v-button>
        </template>
        <template v-else>
            <v-button
                class="mx-[12px] w-[200px]"
                button-type="danger"
                rounded
                @click="$emit('bad')"
            >
                Źle
            </v-button>
            <v-button
                class="mx-[12px] w-[200px]"
                button-type="success"
                rounded
                @click="$emit('good')"
            >
                Świetnie
            </v-button>
        </template>
    </div>
</template>

<script setup lang="ts">
import VButton from '@/components/atoms/VButton.vue';

const props = defineProps({
    answerRevealed: Boolean
});

const emit = defineEmits<{
    (e: 'check'): void;
    (e: 'hint'): void;
    (e: 'good'): void;
    (e: 'bad'): void;
}>();
</script>
