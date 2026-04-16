import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// Registramos Pinia (los stores)
app.use(createPinia())

// Registramos el Router (las rutas)
app.use(router)

app.mount('#app')