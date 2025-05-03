import { createRouter, createWebHistory } from 'vue-router';
import { config } from '@/config';
import { routes } from './routes';
import { useAuthStore } from '@/store/modules/auth';

const router = createRouter({
    history: createWebHistory(config.publicPath),
    routes
});

router.beforeEach(async (routeTo, _routeFrom, next) => {
    const authRequired = routeTo.matched.some(route => route.meta.authRequired);
    const guestOnly = routeTo.matched.some(route => route.meta.guestOnly);
    const { isLoggedIn } = useAuthStore();

    if (!routeTo.matched.length) {
        return isLoggedIn ? redirectToDashboard() : redirectToLogin();
    }

    if (!authRequired && !guestOnly) {
        return next();
    }

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
