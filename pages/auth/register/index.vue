<template>
    <BaseContainer class="auth-wrapper flex items-center justify-center">
        <div class="max-w-[600px] mx-auto p-8 w-full bg-gray-500/10 rounded-md">
            <h1 class="text-2xl text-center mb-7">Let's get it started!</h1>
            <form @submit.prevent="submitForm">
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
                <BaseButton>Register</BaseButton>
            </form>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { RegisterFields } from './register.types'
import {
    required,
    email,
    minLength,
    sameAs,
    helpers,
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const registerFieldValues = reactive({
    email: '',
    password: '',
    rpassword: '',
})

const registerFieldErrors = reactive({
    email: '',
    password: '',
    rpassword: '',
})
const sameAsPassword = (value: string) => {
    return value === registerFieldValues.password
}
const rules = {
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

// const messageController = useMessage()

const authStore = useAuthStore()

const isFetching = ref(false)

const v$ = useVuelidate(rules, registerFieldValues)

const submitForm = () => {
    v$.value.$validate()
    const errors = v$.value.$errors

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
    const error = await authStore.register(payload.email, payload.password)
    isFetching.value = false
    if (error) {
        // messageController.error(error)
    } else {
        // messageController.success('Success login!')
    }
}
</script>

<style lang="sass" scoped>
.auth-wrapper
    height: calc(100vh - 72px)
</style>
