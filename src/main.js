import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { vueErrorHandler } from './utils/errorHandler.js'

const app = createApp(App)
const pinia = createPinia()

// Configure global error handling
app.config.errorHandler = vueErrorHandler

// Configure global properties
app.config.globalProperties.$errorHandler = vueErrorHandler

app.use(pinia)
app.use(router)
app.mount('#app')
