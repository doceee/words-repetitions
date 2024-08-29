// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/seo",
        "@nuxtjs/tailwindcss",
        "@nuxt/eslint",
        "@nuxt/image",
    ],
    css: ["@/assets/styles/main.css"],
    image: {
        quality: 80,
    },
    nitro: {
        compressPublicAssets: true,
        minify: true,
        publicAssets: [
            {
                baseURL: "images",
                dir: "public/images",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            },
        ],
    },
    runtimeConfig: {
        public: {
            appUrl: process.env.APP_URL,
        },
    },
})
