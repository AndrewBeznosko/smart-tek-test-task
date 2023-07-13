import { createApp } from 'vue'
import vuexStore from '@/store'
import App from '@/App.vue'
import router from '@/router'
import '@/assets/scss/_index.scss'

const app = createApp(App)

app.use(vuexStore)
app.use(router)

app.mount('#app')
