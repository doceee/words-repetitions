const colors = require("tailwindcss/colors")
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app.vue",
        "./pages/**/*.{vue,html}",
        "./components/**/*.{vue,html}",
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.gray[600],
                secondary: colors.orange[400],
            },
        },
        fontFamily: {
            sans: ["Robot", "sans-serif"],
            rowdies: ["Rowdies", "sans-serif"],
        },
    },
    plugins: [],
}
