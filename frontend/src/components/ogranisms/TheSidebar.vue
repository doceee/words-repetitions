<template>
    <div
        class="fixed left-0 top-0 z-[39] h-[100vh] w-[100vw] bg-gray-400 opacity-20"
        @click="onClose"
    />

    <div
        id="drawer-navigation"
        class="absolute right-0 top-0 z-40 h-screen w-64 overflow-y-auto bg-white px-[18px] pt-[6px] dark:bg-gray-800"
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
    >
        <button
            type="button"
            class="ml-auto block items-center rounded-lg bg-transparent p-1.5 text-sm hover:bg-gray-200"
            @click="onClose"
        >
            <x-mark-icon class="ml-auto grid h-[25px] hover:cursor-pointer" />
            <span class="sr-only">Close menu</span>
        </button>

        <div class="overflow-y-auto py-4">
            <ul class="space-y-2 font-medium">
                <sidebar-nav-item
                    v-for="item in navItemList"
                    :key="item.text"
                    :to="item.to"
                    :text="item.text"
                    :icon="item.icon"
                    @click="item.click"
                />
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    XMarkIcon,
    UserIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/vue/20/solid';
import SidebarNavItem from '@/components/atoms/SidebarNavItem.vue';
import { useAuthStore } from '@/store/modules/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits(['close']);
const onClose = () => emit('close');

const handleLogout = async () => {
    try {
        await authStore.logout();

        onClose();
        router.push({ name: 'login' });
    } catch (error) {
        console.error(error);
    }
};

const navItemList = [
    { text: 'Profil', icon: UserIcon, to: '/profile', click: onClose },
    { text: 'Wyloguj', icon: ArrowRightOnRectangleIcon, click: handleLogout }
];
</script>
