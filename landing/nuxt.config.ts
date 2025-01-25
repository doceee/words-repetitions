// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/seo",
        "@nuxt/image",
        "@nuxt/eslint",
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
    typescript: {
        typeCheck: true,
    },
})
