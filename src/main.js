import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import "@/assets/styles/main.css";
import router from './router'
const vue = createApp(App).use(router);
vue.mount('#app')
