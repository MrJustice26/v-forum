import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const authRoutes = ['/auth/login', '/auth/register']
    authStore.$subscribe(() => {
        if(authStore.isAuth){
            return navigateTo("/")
        }
        return navigateTo(authRoutes[0]);
    })
})