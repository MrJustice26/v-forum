import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
  // TODO: REWORK
  const authStore = useAuthStore();
  if (!authStore.isAuth && localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"));
    authStore.checkAuth();
  }
  // authStore.setFetchingStatus(true);
});
