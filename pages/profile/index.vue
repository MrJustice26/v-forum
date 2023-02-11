<template>
  <div class="container">
    <div class="profile">
      <div class="profile-header">
        <feather-icon icon="user" />
        <p>Profile settings</p>
      </div>

      <div class="profile-body">
        <div class="profile-body__group">
          Email: {{ getUserData?.email }}
          <n-tag :bordered="false" :type="getAccountStatusColor">{{
            getAccountStatus
          }}</n-tag>
        </div>
      </div>
      <hr />
      <div class="profile-actions">
        <n-button type="primary" @click="logout">Log out</n-button>
        <n-button type="error">Delete account</n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NTag } from "naive-ui";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};

const getUserData = computed(() => authStore.getUser);

const getAccountStatus = computed(() =>
  getUserData.value?.isActivated ? "Activated" : "Not activated"
);

const getAccountStatusColor = computed(() =>
  getUserData.value?.isActivated ? "success" : "error"
);
</script>

<style lang="scss" scoped>
.profile {
  padding: 1rem 3rem;
  display: inline-block;
  &-header {
    display: flex;
    column-gap: 10px;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
  }

  &-body {
    &__group {
      margin-bottom: 10px;
    }
  }

  &-actions {
    display: flex;
    column-gap: 2rem;
  }
}
</style>
