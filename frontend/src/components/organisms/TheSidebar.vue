<template>
    <div
        id="drawer-navigation"
        class="absolute right-0 top-0 z-40 h-screen w-64 overflow-y-auto bg-white px-[18px] pt-[6px]"
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
    >
        <teleport to="body">
            <div
                class="fixed left-0 top-0 z-[39] h-[100vh] w-[100vw] bg-gray-400 opacity-40"
                @click="onClose"
            />
        </teleport>

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
                    @click="item.click"
                />
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/20/solid';
import SidebarNavItem from '@/components/atoms/SidebarNavItem.vue';
import { useAuthStore } from '@/store/modules/auth';
import { useWordsStore } from '@/store/modules/words';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const wordsStore = useWordsStore();
const emit = defineEmits(['close']);
const onClose = () => emit('close');

const handleLogout = async () => {
    try {
        await authStore.logout();

        wordsStore.$reset();
        onClose();
        router.push({ name: 'login' });
    } catch (error) {
        console.error(error);
    }
};

const navItemList = [
    { text: 'Strona główna', to: '/', click: onClose },
    { text: 'Słówka', to: '/word-list', click: onClose },
    { text: 'Powtórki', to: '/reviews', click: onClose },
    { text: 'Gry językowe', to: '/games', click: onClose },
    { text: 'Wyloguj', click: handleLogout }
];
</script>
