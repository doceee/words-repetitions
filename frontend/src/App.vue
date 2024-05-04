<template>
    <component :is="layouts[layoutName]">
        <router-view />
    </component>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { watch, ref, onMounted, defineAsyncComponent } from 'vue';
import { useAuthStore } from '@/store/modules/auth';

const layouts = {
    auth: defineAsyncComponent(() => import('./layouts/AuthLayout.vue')),
    loader: defineAsyncComponent(() => import('./layouts/LoaderLayout.vue')),
    default: defineAsyncComponent(() => import('./layouts/DefaultLayout.vue'))
};

const isLoading = ref(true);
const isValidated = ref(false);
const route = useRoute();
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
const layoutName = ref<keyof typeof layouts>('loader');

const checkLayout = () => {
    const {
        meta: { layout = 'default', authRequired = false }
    } = route;

    if (!isValidated.value || (authRequired && !isLoggedIn.value)) {
        return;
    }

    layoutName.value = layout;
};

watch(
    () => route.fullPath,
    () => {
        checkLayout();
    }
);

watch(
    () => isLoggedIn.value,
    val => {
        if (val) {
            return;
        }

        if (layoutName.value === 'default') {
            layoutName.value = 'loader';
        }
    }
);

onMounted(() => {
    setTimeout(async () => {
        await authStore.validate();

        isValidated.value = true;
        isLoading.value = false;
        checkLayout();
    }, 1000);
});
</script>
