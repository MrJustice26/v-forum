import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuth;
    const authRoutes = ['/auth/login', '/auth/register']
    if(!authStore.getFetchingStatus){
        if(!isAuthenticated && !authRoutes.includes(to.path)){
            return navigateTo(authRoutes[0]);
        }
        if(isAuthenticated && authRoutes.includes(to.path)){
            return navigateTo('/');
        }
    }

    authStore.$subscribe(() => {
        if(authStore.isAuth){
            return navigateTo("/")
        }
        return navigateTo(authRoutes[0]);
    })
})