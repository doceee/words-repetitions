<template>
    <div class="w-full bg-white">
        <div
            class="relative mx-auto grid h-full w-full max-w-4xl grid-cols-[50px_auto_50px] ease-in-out sm:grid-cols-[90px_auto_90px]"
        >
            <div />

            <div
                class="relative mx-2 flex flex-1 items-center justify-center py-2 sm:ml-0"
            >
                <form
                    class="w-[212px] sm:w-[260px]"
                    @submit.prevent="submitSearch"
                >
                    <input
                        v-model="text"
                        type="text"
                        placeholder="Wyszukaj po angielsku..."
                        class="h-9 w-full rounded border border-gray-300 focus:outline-none focus:ring-sky-500"
                    />
                    <magnifying-glass-icon
                        class="absolute right-0 top-[6px] mr-2 h-5 hover:cursor-pointer"
                        @click="submitSearch"
                    />
                </form>
            </div>

            <div class="mr-4 grid self-center">
                <button
                    type="button"
                    data-drawer-hide="drawer-navigation"
                    aria-controls="drawer-navigation"
                    class="ml-auto inline-flex w-min items-center rounded-lg border-[1px] border-transparent bg-transparent p-1.5 text-sm hover:border-black"
                    data-testid="toggle-sidebar"
                    @click="isSidebarOpen = !isSidebarOpen"
                >
                    <bars3-icon class="ml-auto h-6" />
                </button>
            </div>

            <the-sidebar v-if="isSidebarOpen" @close="isSidebarOpen = false" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/vue/20/solid';
import { useWordsStore } from '@/store/modules/words';
import TheSidebar from '@/components/organisms/TheSidebar.vue';
import { useRouter } from 'vue-router';

const wordsStore = useWordsStore();
const router = useRouter();

const isSidebarOpen = ref(false);
const text = ref('');

const { searchText } = storeToRefs(wordsStore);

const submitSearch = () => {
    if (text.value.length < 2) {
        return;
    }

    wordsStore.setSearchText(text.value);

    if (router.currentRoute.value.name !== 'search') {
        router.push({ name: 'search', query: { word: text.value } });
    }

    wordsStore.searchWords();
};

watch(searchText, val => {
    if (!val) {
        text.value = '';
    }
});
</script>
