import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
    const authStore = useAuthStore()
    if (localStorage.getItem('token')) {
        authStore.checkAuth()
    }
    authStore.setFetchingStatus(true)
})
