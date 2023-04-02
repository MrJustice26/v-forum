import { useAuthStore } from '~/stores/auth'
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const authRoutes = ['/auth/login', '/auth/register']
    const authActivation = '/auth/activate'
    if (to.path.startsWith(authActivation)) return
    if (!authStore.isAuth && !authRoutes.includes(to.path)) {
        return navigateTo(authRoutes[0])
    }
    authStore.$subscribe(() => {
        if (authStore.isAuth) {
            return navigateTo('/')
        }
        return navigateTo(authRoutes[0])
    })
})
