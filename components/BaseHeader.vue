<template>
    <header>
        <BaseContainer>
            <nav
                class="flex justify-between py-5 items-center mx-auto max-w-[1200px]"
            >
                <nuxt-link
                    to="/"
                    class="text-2xl hover:text-emerald-300 transition-colors"
                    >V-Forum<Icon name="mdi:chat" class="ml-2" />
                </nuxt-link>
                <ClientOnly>
                    <div v-show="userData?.email">
                        <nuxt-link
                            to="/profile"
                            class="hover:text-emerald-300 transition-colors flex text-lg gap-x-2"
                        >
                            <Icon name="ic:round-person" size="24" />
                            {{ userData?.username }}
                        </nuxt-link>
                    </div>
                    <div v-show="!userData?.email">
                        <nuxt-link
                            to="/auth/login"
                            class="hover:text-emerald-300 transition-colors mr-5"
                            >Log in</nuxt-link
                        >

                        <nuxt-link
                            to="/auth/register"
                            class="hover:text-emerald-300 transition-colors"
                        >
                            Register</nuxt-link
                        >
                    </div>
                </ClientOnly>
            </nav>
        </BaseContainer>
    </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const userData = computed(() => authStore.getUser)
</script>
