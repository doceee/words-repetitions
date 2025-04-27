// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    app: {
        head: {
            htmlAttrs: {
                lang: "pl",
            },
            title: "VocabMaster",
            titleTemplate: "%s",
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    name: "title",
                    content: "VocabMaster - Nauka angielskiego online!",
                },
                {
                    name: "description",
                    content:
                        "Nauka angielskiego online! Platforma do nauki języka angielskiego przez internet! VocabMaster",
                },
                {
                    name: "keywords",
                    content:
                        "nauka angielskiego, angielski, nauka online, angielski online",
                },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        },
    },
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: [
        "@nuxt/eslint",
        "@nuxt/image",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/seo",
    ],
    css: ["@splidejs/splide/css", "@/assets/styles/main.css"],
    plugins: [{ src: "@/plugins/splide.client.ts", mode: "client" }],
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
