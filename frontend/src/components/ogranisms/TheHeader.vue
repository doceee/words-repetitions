<template>
    <div
        class="flex h-[55px] w-full border-b-[1px] border-gray-300 bg-white transition-[width] ease-in-out sm:grid sm:grid-cols-[90px_auto_90px]"
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
                    class="text-purple-lighter absolute right-0 top-[6px] mr-4 h-[20px] hover:cursor-pointer"
                    @click="submitSearch"
                />
            </form>
        </div>

        <v-button
            class="mr-[8px] block h-[35px] self-center"
            @click="handleLogout"
        >
            <span class="hidden sm:inline">Wyloguj</span>
            <arrow-right-on-rectangle-icon class="block h-[20px] sm:hidden" />
        </v-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import {
    MagnifyingGlassIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/vue/20/solid';
import VButton from '@/components/atoms/VButton.vue';
import { useAuthStore } from '@/store/modules/auth';
import { useWordsStore } from '@/store/modules/words';

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
