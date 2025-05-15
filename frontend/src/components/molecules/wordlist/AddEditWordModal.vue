<template>
    <div
        class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center"
        v-if="props.isOpen"
    >
        <div
            class="absolute h-full w-full bg-gray-400 opacity-40"
            @click="$emit('close')"
        ></div>

        <div class="absolute max-h-full max-w-full overflow-y-auto">
            <div class="container rounded-md bg-white">
                <div
                    class="text-md flex select-none items-center justify-between rounded-t-md border-b bg-gray-100 px-4 py-2 text-center font-medium leading-none sm:text-left"
                >
                    <h3> {{ props.wordId ? 'Edytuj' : 'Dodaj' }} słówko </h3>
                    <button
                        class="text-3xl hover:text-gray-600"
                        @click="$emit('close')"
                    >
                        &#215;
                    </button>
                </div>

                <div class="max-h-full px-4 py-2">
                    <div class="bg-white px-2 py-2">
                        <form
                            class="flex w-full flex-col sm:grid sm:grid-cols-[auto_auto] sm:gap-4"
                            @keydown.enter.prevent="onSubmit"
                        >
                            <v-input
                                ref="wordInput"
                                id="word-input"
                                v-model="formData.word"
                                required
                                label="Słówko"
                                :spellcheck="false"
                                :error="getError('word')"
                                @input="clearError('word')"
                            />
                            <v-input
                                id="translation-input"
                                v-model="formData.translation"
                                required
                                label="Tłumaczenie"
                                :spellcheck="false"
                                :error="getError('translation')"
                                @input="clearError('translation')"
                            />
                        </form>
                        <div class="flex justify-between sm:flex">
                            <v-button
                                button-type="gray"
                                @click="$emit('close')"
                            >
                                Anuluj
                            </v-button>
                            <v-button
                                :is-disabled="!isFormChanged"
                                button-type="success"
                                @click="onSubmit"
                            >
                                Potwierdź
                            </v-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, reactive, nextTick } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { AxiosError } from 'axios';
import { wordValidation } from '@/helpers/validationRules';
import { toast } from '@/helpers/toast';
import VInput from '@/components/atoms/VInput.vue';
import VButton from '@/components/atoms/VButton.vue';
import { useWordsStore } from '@/store/modules/words';
import type { ServerError } from '@/types/auth';

const props = withDefaults(
    defineProps<{
        isOpen: boolean;
        wordId?: string;
    }>(),
    {
        wordId: ''
    }
);

const emit = defineEmits(['close']);
const initFormData = reactive({ word: '', translation: '' });
const formData = reactive({ word: '', translation: '' });

const serverErrors = ref<ServerError[]>([]);
const wordInput = ref<{ focus: () => void } | null>(null);

const rules = computed(() => ({
    word: wordValidation,
    translation: wordValidation
}));

const wordsStore = useWordsStore();
const v$ = useVuelidate(rules, formData);
const isFormChanged = ref(false);

watch(formData, val => {
    if (JSON.stringify(val) === JSON.stringify(initFormData)) {
        isFormChanged.value = false;
    } else {
        isFormChanged.value = true;
    }
});

watch(
    () => props.isOpen,
    async val => {
        v$.value.$reset();
        serverErrors.value = [];

        if (val) {
            document.addEventListener('keyup', keyboardEvent);

            await nextTick();

            wordInput.value?.focus();
            const selectedWord = wordsStore.words.find(
                item => item.id === props.wordId
            );

            if (selectedWord) {
                Object.assign(formData, selectedWord);
                Object.assign(initFormData, selectedWord);
            }
        } else {
            Object.assign(formData, { word: '', translation: '' });
            Object.assign(initFormData, { word: '', translation: '' });
            document.removeEventListener('keyup', keyboardEvent);
        }
    }
);

const onSubmit = async () => {
    v$.value.$validate();
    clearError();

    if (v$.value.$invalid) {
        return;
    }

    try {
        const word = formData.word.trim();
        const translation = formData.translation.trim();

        if (props.wordId) {
            await wordsStore.editWord(word, translation, props.wordId);
        } else {
            await wordsStore.addWord(word, translation);
        }

        toast(
            props.wordId ? 'Słówko zaktualizowane' : 'Słówko dodane',
            'success'
        );

        emit('close');
    } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
            const { response } = error;

            if (response) {
                const { status, data } = response;

                if (status === 400 && data) {
                    serverErrors.value = [response.data.message];

                    return;
                }
            }
        }
        toast('Coś poszło nie tak', 'error');
    }
};

const getError = (key: string) => {
    if (serverErrors.value.some(item => item.param === key)) {
        return serverErrors.value.find(item => item.param === key)?.msg;
    }

    return v$.value[key].$errors.length
        ? v$.value[key].$errors[0].$message
        : '';
};

const clearError = (key?: string) => {
    if (key && serverErrors.value.some(item => item.param === key)) {
        serverErrors.value = serverErrors.value.filter(
            item => item.param !== key
        );

        return;
    }

    serverErrors.value = [];
};

const keyboardEvent = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
        emit('close');
    }
};
</script>
