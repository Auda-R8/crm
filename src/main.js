import { createApp } from 'vue'
import App from './App.vue'

import store from './store/store.js'
import router from './router/index.js'
import messagePlugin from './plugins/message.plugin'

import("./styles/style.css")
import("materialize-css/dist/js/materialize.min")

createApp(App)
    .use(store)
    .use(router)
    .use(messagePlugin)
    .mount('#app')