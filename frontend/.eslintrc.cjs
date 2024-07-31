/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        requireConfigFile: false
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    ignorePatterns: ['src/types/**/*'],
    rules: {
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true
            }
        ],
        'vue/max-attributes-per-line': ['off'],
        'vue/html-self-closing': ['off'],
        'vue/no-v-html': ['off'],
        'vue/order-in-components': 2,
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/custom-event-name-casing': ['error', 'kebab-case'],
        'no-console': [
            'error',
            {
                allow: ['error', 'warn', 'info']
            }
        ]
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    },
    globals: {
        require: true,
        process: true,
        module: true,
        __dirname: true,
        BlobPart: true,
        useRuntimeConfig: true
    }
};
