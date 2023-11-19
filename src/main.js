import { createApp } from 'vue'
import App from './App.vue'

import Vuex from "vuex"

import router from './router/index.js'

import("./styles/style.css")
import("materialize-css/dist/js/materialize.min")

createApp(App)
    .use(router)
    .use(Vuex)
    .mount('#app')