<template>
    <div>
        <div class="mx-auto w-full max-w-[400px]">
            <input
                id="true-option"
                v-model="model"
                type="checkbox"
                class="hidden"
                :value="props.modelValue"
            />
            <label
                for="true-option"
                class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:text-gray-600"
                :class="[val ? 'border-green-600' : 'border-red-600']"
            >
                <div
                    class="w-full text-center text-xl font-semibold"
                    :class="[val ? 'text-green-600' : 'text-red-600']"
                >
                    {{ val ? 'PRAWDA' : 'FAŁSZ' }}
                </div>
            </label>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
    modelValue: Boolean
});
const emit = defineEmits(['update:modelValue']);

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        val.value = value;
        emit('update:modelValue', value);
    }
});

const val = ref(model.value);
</script>
