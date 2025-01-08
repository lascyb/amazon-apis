import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from "pinia-plugin-persistedstate"
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './style.css'
import App from './App.vue'
const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia)
app.mount('#app')