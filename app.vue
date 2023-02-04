<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
const userData = authStore.getUserData;
</script>
