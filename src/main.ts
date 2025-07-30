import { createApp } from 'vue'
import pinia from '@/stores/index'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
//注册图标
import 'virtual:svg-icons-register'
// vant需要单独引入的样式
import 'vant/es/toast/style'
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
