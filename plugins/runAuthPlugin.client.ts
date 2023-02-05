import { useAuthStore } from "~/stores/auth";
export default defineNuxtPlugin(nuxtApp => {
    const authStore = useAuthStore();
    if (!authStore.isAuth && localStorage.getItem("token")) {
        authStore.checkAuth();
    }
})