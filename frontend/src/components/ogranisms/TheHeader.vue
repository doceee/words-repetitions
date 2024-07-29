<template>
    <div class="w-full bg-white">
        <div
            class="relative mx-auto grid h-full w-full max-w-4xl grid-cols-[50px_auto_50px] ease-in-out sm:grid-cols-[90px_auto_90px]"
        >
            <div />

            <div
                class="relative mx-[10px] flex flex-1 items-center justify-center py-[7px] sm:ml-0"
            >
                <form
                    class="w-[212px] sm:w-[260px]"
                    @submit.prevent="submitSearch"
                >
                    <input
                        v-model="text"
                        type="text"
                        placeholder="Wyszukaj po angielsku..."
                        class="h-[35px] w-full rounded border border-gray-300 focus:outline-none focus:ring-blue-600"
                    />
                    <magnifying-glass-icon
                        class="absolute right-0 top-[6px] mr-[8px] h-[20px] hover:cursor-pointer"
                        @click="submitSearch"
                    />
                </form>
            </div>

            <div class="mr-[18px] grid self-center">
                <button
                    type="button"
                    data-drawer-hide="drawer-navigation"
                    aria-controls="drawer-navigation"
                    class="ml-auto inline-flex w-min items-center rounded-lg bg-transparent p-1.5 text-sm hover:bg-gray-200"
                    @click="isSidebarOpen = !isSidebarOpen"
                >
                    <bars3-icon class="ml-auto h-[25px]" />
                </button>
            </div>

            <the-sidebar v-if="isSidebarOpen" @close="isSidebarOpen = false" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/vue/20/solid';
import { useWordsStore } from '@/store/modules/words';
import TheSidebar from '@/components/ogranisms/TheSidebar.vue';
import { useRouter } from 'vue-router';

const wordsStore = useWordsStore();
const router = useRouter();

const isSidebarOpen = ref(false);
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

const searchWords = async () => {
    try {
        await wordsStore.searchWords();
    } catch (error) {
        console.error(error);
    }
};
</script>
