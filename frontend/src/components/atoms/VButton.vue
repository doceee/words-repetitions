<template>
    <component
        :is="to ? 'router-link' : 'button'"
        :to="to"
        :type="type"
        :disabled="isDisabled || isProcessing"
        :class="classes"
        class="flex justify-center font-medium"
        @click="onClick"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';

const props = withDefaults(
    defineProps<{
        isProcessing?: boolean;
        type?: string;
        isDisabled?: boolean;
        link?: boolean;
        to?: string;
        buttonType?: 'normal' | 'danger' | 'success';
    }>(),
    {
        isProcessing: false,
        type: undefined,
        isDisabled: false,
        to: '',
        buttonType: 'normal'
    }
);

const { isProcessing, type, isDisabled, link, to, buttonType } = toRefs(props);

const emit = defineEmits(['click']);

const onClick = (e: Event) => emit('click', e);

const classes = computed(() => ({
    'inline-flex': link.value,
    'justify-center rounded-md px-3 py-2 text-sm  shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto':
        !link.value,
    'bg-red-600 text-white hover:bg-red-500':
        buttonType.value === 'danger' && !link.value,
    'bg-white text-gray-900 hover:bg-gray-50':
        buttonType.value === 'normal' && !link.value,
    'bg-green-600 text-white hover:bg-green-500':
        buttonType.value === 'success' && !link.value,
    'opacity-40': isDisabled.value
}));
</script>
