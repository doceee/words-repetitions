// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
        rules: {
            "no-console": ["error", { allow: ["error", "info"] }],
            "vue/component-name-in-template-casing": ["error", "kebab-case"],
            "no-unused-vars": [
                "error",
                { vars: "all", args: "after-used", ignoreRestSiblings: true },
            ],
            "vue/max-attributes-per-line": ["off"],
            "vue/html-self-closing": ["off"],
            "vue/order-in-components": 2,
            "vue/custom-event-name-casing": ["error", "kebab-case"],
        },
    },
    {}
)
