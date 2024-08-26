<template>
    <div
        :class="{
            'pb-[20px]': !error && !nonStaticError
        }"
    >
        <div>
            <label :for="id">{{ label }}</label>
        </div>

        <div
            class="relative isolate flex rounded-md shadow-sm"
            :class="{ 'mt-1': label }"
        >
            <input
                :id="id"
                v-model="model"
                class="w-full appearance-none rounded-md border px-3 py-2 text-sm focus-within:z-10 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 lg:text-base"
                :class="inputClass"
                :autocomplete="autocomplete"
                :type="type"
                :disabled="disabled"
                :required="required"
                :placeholder="placeholder"
                @input="onInput"
                @blur="onBlur"
                @focus="onFocus"
            />
        </div>
        <p v-if="error" class="text-xs leading-5 text-red-400">
            {{ error }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        error?: string;
        id?: string;
        type?: string;
        required?: boolean;
        placeholder?: string;
        disabled?: boolean;
        label?: string;
        redBorder?: boolean;
        nonStaticError?: boolean;
    }>(),
    {
        modelValue: '',
        error: '',
        placeholder: '',
        id: Math.random().toString(36),
        type: 'text',
        required: false,
        disabled: false,
        label: '',
        redBorder: false
    }
);

const { error, modelValue, redBorder, type, placeholder, required, disabled } =
    toRefs(props);

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus']);
const model = computed({
    get() {
        return modelValue.value;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

const isRedBorder = computed(() => !!error.value || redBorder.value);
const autocomplete = computed(() => (type.value === 'password' ? 'on' : 'off'));

const inputClass = computed(() => {
    const classes = {
        'border-red-300 text-red-900 placeholder:text-red-300 focus:ring-red-500 focus:border-red-500':
            isRedBorder.value,
        'border-gray-300 placeholder:text-gray-500 focus:ring-sky-500 focus:border-sky-500':
            !isRedBorder.value
    };

    return [classes];
});

const onInput = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    emit('input', value);
};
const onFocus = (e: Event) => emit('focus', e);
const onBlur = (e: Event) => emit('blur', e);
</script>
