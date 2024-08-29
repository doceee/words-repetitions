export const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api',
    frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'http://127.0.0.1:8080',
    publicPath: import.meta.env.VITE_PUBLIC_PATH || '/',
    title: import.meta.env.VITE_TITLE || ''
};
