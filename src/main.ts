import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import { IonicVue } from '@ionic/vue';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Set up Pusher credentials
declare global {
  interface Window {
    Pusher: any,
    echo: any
  }
}

window.Pusher = Pusher;

// Initialize Laravel Echo
const echo = new Echo({
  broadcaster: 'pusher',
  key: 'e_palengke_key',
  wsHost: '192.168.54.239',
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  cluster: 'mt1',
});

// Make Echo available globally
window.echo = echo

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);
// app.config.globalProperties.$Echo = echo
router.isReady().then(() => {
  app.mount('#app');
});