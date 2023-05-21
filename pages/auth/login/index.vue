<template>
    <BaseContainer class="flex items-center justify-center auth-wrapper">
        <div class="max-w-[600px] mx-auto p-8 w-full bg-gray-500/10 rounded-md">
            <h1 class="text-2xl text-center mb-7">Welcome back!</h1>
            <form @submit.prevent="submitForm">
                <BaseInput
                    v-model="loginFieldValues.email"
                    :error-text="loginFieldErrors.email"
                    label-text="Email"
                    id="email-input"
                    type="email"
                />
                <BaseInput
                    v-model="loginFieldValues.password"
                    type="password"
                    :error-text="loginFieldErrors.password"
                    label-text="Password"
                    id="password-input"
                    autocomplete="on"
                />
                <BaseButton :disabled="isFetching">{{
                    isFetching ? 'Loading' : 'Login'
                }}</BaseButton>
            </form>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { LoginFields } from './login.types'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const { $toast } = useNuxtApp()

const authStore = useAuthStore()

const loginFieldValues = reactive({
    email: '',
    password: '',
})

const loginFieldErrors = reactive({
    email: '',
    password: '',
})

const rules = {
    email: {
        required: helpers.withMessage('Email is required!', required),
        email,
    },
    password: {
        required: helpers.withMessage('Password is required!', required),
        minLength: minLength(6),
    },
}

const isFetching = ref(false)

const v$ = useVuelidate(rules, loginFieldValues)

const submitForm = async () => {
    v$.value.$validate()
    const errors = v$.value.$errors

    loginFieldErrors.email =
        (v$.value.email.$errors[0]?.$message as string) || ''
    loginFieldErrors.password =
        (v$.value.password.$errors[0]?.$message as string) || ''

    if (errors.length > 0) return

    login(loginFieldValues)
}

const login = async (payload: LoginFields) => {
    isFetching.value = true
    const error = await authStore.login(payload.email, payload.password)
    isFetching.value = false
    if (error) {
        $toast.error(error)
    } else {
        $toast.success('Success login!')
    }
}
</script>

<style lang="sass" scoped>
.auth-wrapper
    height: calc(100vh - 72px)
</style>
