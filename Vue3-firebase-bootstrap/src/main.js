import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// global styles
import './assets/main.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"



// import store
import store from './store/index'

createApp(App).use(router).use(store).mount('#app')