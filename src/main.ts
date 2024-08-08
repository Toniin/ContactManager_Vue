import {createApp} from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from "@/router.ts";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import '@/index.css'

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark-theme',
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app')