import type { ToastOptions } from 'vue-toastification/dist/types/types';

type IExtendedToastOptions = ToastOptions & {
    type?: 'success' | 'info' | 'warning';
};

declare module 'vue-router' {
    interface RouteMeta {
        title?: string;
        layout?: 'default' | 'auth' | 'loader';
        authRequired?: boolean;
    }
}

declare module 'axios' {
    interface HeadersDefaults {
        uid?: string;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $refs: Record<string, HTMLElement>;
    }
}
