import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@icon-park/vue-next/styles/index.css'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
