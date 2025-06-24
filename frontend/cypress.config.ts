import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            return config;
        },
        baseUrl: 'http://localhost:8080'
    },
    video: false,
    screenshotOnRunFailure: false,
    retries: {
        runMode: 1, // Number of retries in run mode
        openMode: 0 // Number of retries in open mode
    },
    env: {
        userEmail: 'user@gmail.com',
        userPassword: 'test1234'
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite'
        }
    }
});
