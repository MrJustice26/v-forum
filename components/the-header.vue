<template>
  <header>
    <nav class="container">
      <div class="col">
        <nuxt-link to="/">
          <n-button text size="large" class="main-link"> V-Forum </n-button>
        </nuxt-link>
      </div>
      <div class="col" v-show="userData?.email">
        <nuxt-link to="/profile">
          <n-button quaternary><feather-icon icon="user" /> Profile </n-button>
        </nuxt-link>
      </div>
      <div class="col" v-show="!userData?.email">
        <nuxt-link to="/auth/login">
          <n-button text>Log in</n-button></nuxt-link
        >
        <nuxt-link to="/auth/register">
          <n-button text>Register</n-button></nuxt-link
        >
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { NButton } from "naive-ui";

const authStore = useAuthStore();
const userData = computed(() => authStore.getUser);
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
header {
  border-bottom: 1px solid $color-black;
}
nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
}
.col {
  display: flex;
  align-items: center;
  column-gap: 2rem;
  a {
    text-decoration: none;
  }

  .main-link {
    font-size: 1.2rem;
  }
}
</style>
