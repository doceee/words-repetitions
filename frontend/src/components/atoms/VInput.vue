<template>
    <div
        :class="{
            'pb-[20px]': !props.error
        }"
    >
        <div>
            <label :for="props.id">{{ label }}</label>
        </div>

        <div
            class="relative isolate flex rounded-md shadow-sm"
            :class="{ 'mt-1': label }"
        >
            <input
                :id="props.id"
                v-model="model"
                ref="input"
                class="w-full appearance-none rounded-md border px-3 py-2 text-sm focus-within:z-10 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 lg:text-base"
                :class="inputClass"
                :autocomplete="autocomplete"
                :type="props.type"
                :disabled="props.disabled"
                :required="props.required"
                :spellcheck="props.spellcheck"
                :placeholder="props.placeholder"
                @input="onInput"
            />
        </div>
        <p v-if="props.error" class="text-xs leading-5 text-red-400">
            {{ props.error }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

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
        spellcheck?: boolean;
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
        spellcheck: true,
        redBorder: false
    }
);

const input = ref<HTMLInputElement | null>(null);
const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus']);
defineExpose({
    focus: () => input.value?.focus()
});
const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

const isRedBorder = computed(() => !!props.error || props.redBorder);
const autocomplete = computed(() => (props.type === 'password' ? 'on' : 'off'));

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
</script>
