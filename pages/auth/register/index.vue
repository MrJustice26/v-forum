<template>
    <BaseContainer class="auth-wrapper flex items-center justify-center">
        <div class="max-w-[600px] mx-auto p-8 w-full bg-gray-500/10 rounded-md">
            <h1 class="text-2xl text-center mb-7">Let's get it started!</h1>
            <form @submit.prevent="submitForm">
                <BaseInput
                    v-model="registerFieldValues.username"
                    :error-text="registerFieldErrors.username"
                    label-text="Username"
                    id="username-input"
                    type="text"
                />
                <BaseInput
                    v-model="registerFieldValues.email"
                    :error-text="registerFieldErrors.email"
                    label-text="Email"
                    id="email-input"
                    type="email"
                />
                <BaseInput
                    v-model="registerFieldValues.password"
                    type="password"
                    :error-text="registerFieldErrors.password"
                    label-text="Password"
                    id="password-input"
                    autocomplete="on"
                />
                <BaseInput
                    v-model="registerFieldValues.rpassword"
                    type="password"
                    :error-text="registerFieldErrors.rpassword"
                    label-text="Password"
                    id="repeat-password-input"
                    autocomplete="on"
                />
                <BaseButton :disabled="isFetching">{{
                    isFetching ? 'Loading' : 'Register'
                }}</BaseButton>
            </form>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { RegisterFields } from './register.types'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const { $toast } = useNuxtApp()

const registerFieldValues = reactive({
    username: '',
    email: '',
    password: '',
    rpassword: '',
})

const registerFieldErrors = reactive({
    username: '',
    email: '',
    password: '',
    rpassword: '',
})
const sameAsPassword = (value: string) => {
    return value === registerFieldValues.password
}
const rules = {
    username: {
        required: helpers.withMessage('Username is required!', required),
        minLength: minLength(3),
    },
    email: {
        required: helpers.withMessage('Email is required!', required),
        email,
    },
    password: {
        required: helpers.withMessage('Password is required!', required),
        minLength: minLength(6),
    },
    rpassword: {
        required: helpers.withMessage('Repeat password is required!', required),
        minLength: minLength(6),
        sameAs: helpers.withMessage("Passwords doesn't match!", sameAsPassword),
    },
}

const authStore = useAuthStore()

const isFetching = ref(false)

const v$ = useVuelidate(rules, registerFieldValues)

const submitForm = () => {
    v$.value.$validate()
    const errors = v$.value.$errors

    registerFieldErrors.username =
        (v$.value.username.$errors[0]?.$message as string) || ''
    registerFieldErrors.email =
        (v$.value.email.$errors[0]?.$message as string) || ''
    registerFieldErrors.password =
        (v$.value.password.$errors[0]?.$message as string) || ''
    registerFieldErrors.rpassword =
        (v$.value.rpassword.$errors[0]?.$message as string) || ''

    if (errors.length > 0) {
        return false
    }

    register(registerFieldValues)
}

const register = async (payload: Omit<RegisterFields, 'rpassword'>) => {
    isFetching.value = true
    const error = await authStore.register(
        payload.username,
        payload.email,
        payload.password
    )
    isFetching.value = false
    if (error) {
        $toast.error(error)
    } else {
        $toast.success('Success registration!')
    }
}
</script>
