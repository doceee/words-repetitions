<template>
    <component
        :is="props.to ? 'router-link' : 'button'"
        :to="props.to"
        :type="props.type"
        :disabled="props.isDisabled || props.isProcessing"
        :class="classes"
        class="flex justify-center font-medium"
        @click="onClick"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        isProcessing?: boolean;
        type?: string;
        isDisabled?: boolean;
        rounded?: boolean;
        link?: boolean;
        to?: string;
        buttonType?: 'gray' | 'danger' | 'regular' | 'success';
    }>(),
    {
        isProcessing: false,
        type: undefined,
        isDisabled: false,
        to: '',
        buttonType: 'regular'
    }
);

const emit = defineEmits(['click']);

const onClick = (e: Event) => emit('click', e);

const classes = computed(() => ({
    'inline-flex': props.to,
    'justify-center px-3 py-2 text-sm  shadow-sm sm:mt-0': !props.to,
    'bg-gray-300 text-gray-900 hover:bg-gray-100':
        props.buttonType === 'gray' && !props.to,
    'bg-sky-500 text-white hover:bg-sky-700':
        props.buttonType === 'regular' && !props.to,
    'bg-red-500 text-white hover:bg-red-700':
        props.buttonType === 'danger' && !props.to,
    'bg-green-600 text-white hover:bg-green-500':
        props.buttonType === 'success' && !props.to,
    'rounded-full': props.rounded,
    'rounded-md': !props.rounded,
    'opacity-40': props.isDisabled
}));
</script>
