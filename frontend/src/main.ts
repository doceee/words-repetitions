import '@/helpers/api.ts';
import 'vue-toastification/dist/index.css';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.scss';

import App from '@/App.vue';
import router from '@/router';
import { store } from '@/store';
import { createApp } from 'vue';
import VueToast, { POSITION, type PluginOptions } from 'vue-toastification';

export const options: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    hideProgressBar: true,
    maxToasts: 3,
    icon: false,
    timeout: 3000
};

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueToast, options);

app.mount('#app');
