<template>
    <div class="relative inline-block">
        <div
            :aria-expanded="isOpen"
            :aria-controls="popoverId"
            ref="triggerRef"
            @click="togglePopover"
            @keydown.enter="togglePopover"
            @keydown.space.prevent="togglePopover"
            tabindex="0"
        >
            <slot name="trigger" :is-open="isOpen" />
        </div>
        <Teleport :to="teleportTarget" :disabled="!teleportTarget">
            <div
                v-if="isOpen"
                :id="popoverId"
                ref="tooltipRef"
                :class="[
                    'absolute z-[99]',
                    { fixed: teleportTarget },
                    positionClass
                ]"
                :style="popoverStyle"
                role="tooltip"
                @click.stop.prevent="closePopover"
            >
                <slot name="tooltip" />
            </div>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import {
    ref,
    onMounted,
    onBeforeUnmount,
    computed,
    nextTick,
    type PropType
} from 'vue';

const props = defineProps({
    position: {
        type: String,
        default: 'bottom',
        validator: (value: string) =>
            ['top', 'right', 'bottom', 'left', 'bottom-left'].includes(value)
    },
    teleportTarget: {
        type: String as PropType<string | null>,
        default: null
    },
    activePopoverId: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:activePopoverId']);

const isOpen = ref(false);
const tooltipRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const popoverStyle = ref({});
const popoverId = `popover-${Math.random().toString(36).substr(2, 9)}`;

const positionClass = computed(() => {
    if (props.teleportTarget) {
        return '';
    }

    switch (props.position) {
        case 'top':
            return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
        case 'right':
            return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
        case 'bottom':
            return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
        case 'left':
            return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
        default:
            return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
    }
});

const togglePopover = () => {
    if (isOpen.value) {
        closePopover();
    } else {
        emit('update:activePopoverId', popoverId);
        isOpen.value = true;
        nextTick(() => {
            adjustPopoverPosition();
        });
    }
};

const closePopover = () => {
    isOpen.value = false;
    emit('update:activePopoverId', '');
};

const adjustPopoverPosition = () => {
    if (!props.teleportTarget || !tooltipRef.value || !triggerRef.value) {
        return;
    }

    const triggerRect = triggerRef.value.getBoundingClientRect();
    const popoverRect = tooltipRef.value.getBoundingClientRect();
    const offset = 4;

    let top = 0,
        left = 0,
        right = 0;

    switch (props.position) {
        case 'top':
            top = triggerRect.top - popoverRect.height - offset;
            left =
                triggerRect.left +
                triggerRect.width / 2 -
                popoverRect.width / 2;
            break;
        case 'right':
            top =
                triggerRect.top +
                triggerRect.height / 2 -
                popoverRect.height / 2;
            left = triggerRect.right + offset;
            break;
        case 'bottom':
            top = triggerRect.bottom + offset;
            left =
                triggerRect.left +
                triggerRect.width / 2 -
                popoverRect.width / 2;
            break;
        case 'bottom-left':
            top = triggerRect.bottom + offset;
            right = window.innerWidth - triggerRect.right;
            break;
        case 'left':
            top =
                triggerRect.top +
                triggerRect.height / 2 -
                popoverRect.height / 2;
            left = triggerRect.left - popoverRect.width - offset;
            break;
    }

    if (props.teleportTarget) {
        top = Math.max(
            8,
            Math.min(top, window.innerHeight - popoverRect.height - 8)
        );
        left = Math.max(
            8,
            Math.min(left, window.innerWidth - popoverRect.width - 8)
        );
        right = Math.max(
            8,
            Math.min(right, window.innerWidth - popoverRect.width - 8)
        );
    }

    popoverStyle.value =
        props.position === 'bottom-left'
            ? { top: `${top}px`, right: `${right}px` }
            : { top: `${top}px`, left: `${left}px` };
};

const handleClickOutside = (event: Event) => {
    if (
        tooltipRef.value &&
        triggerRef.value &&
        !tooltipRef.value.contains(event.target as Node) &&
        !triggerRef.value.contains(event.target as Node)
    ) {
        closePopover();
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', adjustPopoverPosition);
    window.addEventListener('scroll', adjustPopoverPosition);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', adjustPopoverPosition);
    window.removeEventListener('scroll', adjustPopoverPosition);
});
</script>
