<template>
    <div class="h-[55px] w-full bg-white">
        <div
            class="mx-auto h-full w-full max-w-4xl transition-[width] ease-in-out sm:grid sm:grid-cols-[90px_auto_90px]"
        >
            <div class="hidden sm:block" />

            <div
                class="relative mx-[10px] flex flex-1 items-center justify-center sm:ml-0"
            >
                <form
                    class="h-[35px] w-[219px] sm:w-[260px]"
                    @submit.prevent="submitSearch"
                >
                    <input
                        v-model="text"
                        type="text"
                        placeholder="Wyszukaj po angielsku..."
                        class="h-[35px] w-full rounded border border-gray-300 focus:outline-none focus:ring-blue-600"
                    />
                    <magnifying-glass-icon
                        class="absolute right-0 top-[6px] mr-4 h-[20px] hover:cursor-pointer"
                        @click="submitSearch"
                    />
                </form>
            </div>

            <popover class="relative mr-[8px] grid h-[35px] self-center">
                <popover-button
                    class="justify-self-end rounded-md p-1 hover:bg-gray-200"
                >
                    <user-circle-icon class="h-[25px] hover:cursor-pointer" />
                </popover-button>
                <popover-panel
                    class="absolute right-0 top-[40px] z-10 rounded-md border-[1px] bg-white p-2 shadow-md"
                    v-slot="{ close }"
                >
                    <ul class="flex-wrap justify-center" @click="close">
                        <li
                            class="w-full cursor-pointer rounded-md font-normal hover:bg-gray-200"
                        >
                            <router-link
                                class="block h-full w-full px-2 py-[3px]"
                                to="/profile"
                            >
                                Profil
                            </router-link>
                        </li>
                        <button
                            class="w-full cursor-pointer rounded-md px-2 py-[3px] font-normal hover:bg-gray-200"
                            @click="handleLogout"
                        >
                            Wyloguj
                        </button>
                    </ul>
                </popover-panel>
            </popover>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/store/modules/auth';
import { useWordsStore } from '@/store/modules/words';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

const wordsStore = useWordsStore();
const authStore = useAuthStore();
const router = useRouter();
const text = ref('');

const { searchText } = storeToRefs(wordsStore);

const submitSearch = () => {
    if (text.value.length < 2) return;

    if (
        searchText.value === text.value &&
        router.currentRoute.value.name === 'search'
    ) {
        return;
    }

    wordsStore.setSearchText(text.value);

    if (router.currentRoute.value.name !== 'search') {
        router.push({ name: 'search', query: { word: text.value } });

        return;
    }

    searchWords();
};

const handleLogout = async () => {
    try {
        await authStore.logout();

        router.push({ name: 'login' });
    } catch (error) {
        console.error(error);
    }
};

const searchWords = async () => {
    try {
        await wordsStore.searchWords();
    } catch (error) {
        console.error(error);
    }
};
</script>
