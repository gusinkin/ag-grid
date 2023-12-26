import '@/app/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App'
import router from './providers/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')