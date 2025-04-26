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
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.5s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
        fontFamily: {
            sans: ["Robot", "sans-serif"],
            rowdies: ["Rowdies", "sans-serif"],
        },
    },
    plugins: [],
}
