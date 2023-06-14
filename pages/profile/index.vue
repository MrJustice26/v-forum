<template>
    <BaseContainer>
        <div class="profile w-[600px] mx-auto">
            <h1 class="text-4xl text-center mb-10">Profile settings</h1>

            <div class="profile-body mb-7">
                <div class="mb-4">Login: {{ getUserData?.username }}</div>

                <div class="mb-4">
                    <span class="mr-5"> Email: {{ getUserData?.email }} </span>
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
