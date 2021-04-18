import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import "@/assets/styles/main.css";
import router from './router'
import Basebutton from './components/Basebutton'
import Navbar from './components/Navbar'
const vue = createApp(App).use(router);
vue.component('base-button',Basebutton)
vue.component('nav-bar',Navbar)
vue.mount('#app')
