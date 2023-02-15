<template>
  <div v-show="isFetched">
    <TheHeader />
    <slot />
  </div>
  <div v-show="!isFetched">
    <h1>Loading ...</h1>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();
const isFetched = computed(() => authStore.getFetchingStatus);
</script>
