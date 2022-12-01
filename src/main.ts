import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './stores'
import router from './routers'
import axios from 'axios'
import { useLoginUserStore } from './stores/login-user'

axios.defaults.baseURL = '/api'
axios.interceptors.request.use((config) => {
    if (config && config.headers) {
        const loginUserStore = useLoginUserStore()
        const token = loginUserStore.getToken
        config.headers['Token'] = token ? token : ''
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

createApp(App).use(store).use(router).mount('#app')
