import { createRouter, createWebHistory } from 'vue-router';
import { config } from '@/config';
import { routes } from './routes';
import { useAuthStore } from '@/store/modules/auth';

const router = createRouter({
    history: createWebHistory(config.publicPath),
    routes
});

router.beforeEach(async (routeTo, routeFrom, next) => {
    const authRequired = routeTo.matched.some(route => route.meta.authRequired);
    const guestOnly = routeTo.matched.some(route => route.meta.guestOnly);

    if (!authRequired && !guestOnly) {
        return next();
    }

    const { isLoggedIn } = useAuthStore();

    if (authRequired && !isLoggedIn) {
        return redirectToLogin();
    }

    if (guestOnly) {
        return isLoggedIn ? redirectToDashboard() : next();
    }

    return next();

    function redirectToLogin() {
        next({ name: 'login' });
    }

    function redirectToDashboard() {
        next({ name: 'dashboard' });
    }
});

router.afterEach(to => {
    document.title = `${
        to?.meta?.title ? to?.meta?.title + ' | ' + config.title : config.title
    }`;
});

export default router;
