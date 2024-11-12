<template>
    <div
        :class="{
            'pb-5': !props.error && !props.noError
        }"
        class="relative w-full"
    >
        <div>
            <label :for="props.id">{{ props.label }}</label>
        </div>

        <select
            v-model="selectedValue"
            :id="props.id"
            class="w-full appearance-none rounded-md border px-3 py-2 text-sm focus-within:z-10 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 lg:text-base"
            :class="inputClass"
            :disabled="props.disabled"
            :required="props.required"
            @change="handleChange"
        >
            <option disabled value="">Wybierz</option>

            <option
                v-for="(option, index) in props.options"
                :key="index"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
        <p v-if="props.error" class="text-xs leading-5 text-red-400">
            {{ props.error }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        options?: { label: string; value: string }[];
        error?: string;
        id?: string;
        required?: boolean;
        disabled?: boolean;
        noError?: boolean;
        label?: string;
    }>(),
    {
        modelValue: '',
        options: () => [],
        error: '',
        id: Math.random().toString(36),
        required: false,
        disabled: false,
        noError: true,
        label: ''
    }
);

const emit = defineEmits(['update:modelValue', 'change']);
const isRedBorder = computed(() => !!props.error);
const selectedValue = ref(props.modelValue || '');

watch(
    () => props.modelValue,
    (newValue: string) => {
        selectedValue.value = newValue;
    }
);

const handleChange = () => {
    emit('update:modelValue', selectedValue.value);
    emit('change', selectedValue.value);
};

const inputClass = computed(() => {
    const classes = {
        'border-gray-300 placeholder:text-gray-500 focus:ring-sky-500 focus:border-sky-500':
            !isRedBorder.value,
        'mt-1': props.label
    };

    return [classes];
});
</script>
