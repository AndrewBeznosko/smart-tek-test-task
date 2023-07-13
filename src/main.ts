import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/plugins/router'
import pinia from '@/plugins/pinia'
import '@/assets/scss/_index.scss'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
