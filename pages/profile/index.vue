<template>
    <BaseContainer>
        <div class="profile">
            <div class="profile-header">
                <Icon name="ic:round-person" size="32" />
                <p>Profile settings</p>
            </div>

            <div class="profile-body">
                <div class="profile-body__group">
                    Email: {{ getUserData?.email }}
                    <span
                        class="py-2 px-4 rounded-sm font-medium"
                        :class="tagClassName"
                    >
                        {{ getAccountStatus }}
                    </span>
                </div>
            </div>
            <hr class="mb-5" />
            <div class="profile-actions">
                <BaseButton @click="logout">Logout</BaseButton>
            </div>
        </div>
    </BaseContainer>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const logout = () => {
    authStore.logout()
}

const getUserData = computed(() => authStore.getUser)

const getAccountStatus = computed(() =>
    getUserData.value?.isActivated ? 'Activated' : 'Not activated'
)

const tagClassName = computed(() =>
    getUserData.value?.isActivated ? 'bg-emerald-700/50' : 'bg-red-700/50'
)
</script>

<style lang="scss" scoped>
.profile {
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
