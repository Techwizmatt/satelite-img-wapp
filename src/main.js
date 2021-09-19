import { createApp } from 'vue'
import App from './App.vue'
import Connector from '@/providers/connector'
import Router from './router'

const app = createApp(App)

app.use(Router)

app.config.globalProperties.$http = Connector

app.mount('#app')
