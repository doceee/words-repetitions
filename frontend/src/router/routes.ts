import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/TheLogin.vue'),
        meta: {
            title: 'Logowanie',
            guestOnly: true,
            layout: 'auth'
        }
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: () => import('@/pages/sign-up/TheSignup.vue'),
        meta: {
            title: 'Rejestracja',
            guestOnly: true,
            layout: 'auth'
        }
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/TheDashboard.vue'),
        meta: {
            title: 'Strona główna',
            authRequired: true
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/pages/search/TheSearch.vue'),
        meta: {
            title: 'Wyszukiwanie',
            authRequired: true
        }
    }
];
