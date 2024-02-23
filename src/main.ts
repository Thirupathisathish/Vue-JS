import { createApp } from 'vue'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@fortawesome/vue-fontawesome";
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store'


import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas)
createApp(App)
.component("fa", FontAwesomeIcon)
 .use(router)
 .use(store)
 .mount('#app')


