import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { useKakao } from 'vue3-kakao-maps/@utils'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
const pinia = createPinia()
// const API_KEY = import.meta.env.VITE_API_KEY_KAKAO_MAP

// useKakao('API key')
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(vuetify)
app.use(pinia)

app.mount('#app')
