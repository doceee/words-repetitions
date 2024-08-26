import type { RouteRecordRaw } from 'vue-router';
import TheLogin from '@/pages/login/TheLogin.vue';
import TheDashboard from '@/pages/dashboard/TheDashboard.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: TheLogin,
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
        component: TheDashboard,
        meta: {
            title: 'Strona główna',
            authRequired: true
        }
    },
    {
        path: '/word-list',
        name: 'word-list',
        component: () => import('@/pages/wordlist/WordList.vue'),
        meta: {
            title: 'Słówka',
            authRequired: true
        }
    },
    {
        path: '/reviews',
        name: 'reviews',
        component: () => import('@/pages/reviews/TheReviews.vue'),
        meta: {
            title: 'Powtórki',
            authRequired: true
        }
    },
    {
        path: '/games',
        name: 'games',
        component: () => import('@/pages/games/TheGames.vue'),
        meta: {
            title: 'Gry językowe',
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
