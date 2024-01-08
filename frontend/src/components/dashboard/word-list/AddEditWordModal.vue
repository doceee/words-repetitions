<template>
  <transition-root as="template" :show="isOpen">
    <modal as="div" class="relative z-10" @close="$emit('close')">
      <transition-child
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </transition-child>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <transition-child
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <dialog-panel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="w-full sm:flex sm:items-start">
                  <div class="text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <dialog-title
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      {{ wordId ? 'Edytuj' : 'Dodaj' }} słówko
                    </dialog-title>
                    <div class="mt-2">
                      <form
                        class="flex w-full flex-col sm:grid sm:grid-cols-[auto_auto] sm:gap-4"
                        @keydown.enter.prevent="onSubmit"
                      >
                        <the-input
                          id="word"
                          v-model="formData.word"
                          required
                          label="Słówko"
                          :error="getError('word')"
                          @input="clearError('word')"
                        />
                        <the-input
                          id="translation"
                          v-model="formData.translation"
                          required
                          label="Tłumaczenie"
                          :error="getError('translation')"
                          @input="clearError('translation')"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex justify-between bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <the-button
                  :is-disabled="!isFormChanged"
                  button-type="success"
                  @click="onSubmit"
                >
                  Potwierdź
                </the-button>
                <the-button @click="$emit('close')"> Anuluj </the-button>
              </div>
            </dialog-panel>
          </transition-child>
        </div>
      </div>
    </modal>
  </transition-root>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs, reactive } from 'vue';
import {
  DialogPanel,
  DialogTitle,
  TransitionChild,
  Dialog as Modal,
  TransitionRoot
} from '@headlessui/vue';
import { useVuelidate } from '@vuelidate/core';
import { AxiosError } from 'axios';
import { wordValidation } from '@/helpers/validationRules';
import { toast } from '@/helpers/toast';
import TheInput from '@/components/TheInput.vue';
import TheButton from '@/components/TheButton.vue';
import { useWordsStore } from '@/store/modules/words';
import type { ServerError } from '@/types/auth';

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    wordId: string;
  }>(),
  {
    wordId: ''
  }
);
const { isOpen, wordId } = toRefs(props);

const emit = defineEmits(['close']);
const defaultFormData = { word: '', translation: '' };
const initFormData = reactive({ word: '', translation: '' });
const formData = reactive({ word: '', translation: '' });

const serverErrors = ref<ServerError[]>([]);

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

watch(isOpen, val => {
  v$.value.$reset();
  serverErrors.value = [];

  if (val) {
    const selectedWord = wordsStore.words.find(
      item => item.id === props.wordId
    );

    if (selectedWord) {
      Object.assign(formData, selectedWord);
      Object.assign(initFormData, selectedWord);
    }
  } else {
    Object.assign(formData, defaultFormData);
    Object.assign(initFormData, defaultFormData);
  }
});

const onSubmit = async () => {
  v$.value.$validate();
  clearError();

  if (v$.value.$invalid) {
    return;
  }

  try {
    if (wordId.value) {
      await wordsStore.editWord(
        formData.word,
        formData.translation,
        wordId.value
      );
    } else {
      await wordsStore.addWord(formData.word, formData.translation);
    }

    toast(wordId.value ? 'Słówko zaktualizowane' : 'Słówko dodane', 'success');

    emit('close');
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const {
          status,
          data: { errors }
        } = response;

        if (status === 400 && errors) {
          serverErrors.value = errors;

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

  return v$.value[key].$errors.length ? v$.value[key].$errors[0].$message : '';
};

const clearError = (key?: string) => {
  if (key && serverErrors.value.some(item => item.param === key)) {
    serverErrors.value = serverErrors.value.filter(item => item.param !== key);

    return;
  }

  serverErrors.value = [];
};
</script>
