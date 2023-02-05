<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
onMounted(() => {
  if (localStorage.getItem("token")) {
    authStore.checkAuth();
  }
});
</script>
