<template>
    <div class="container">
        <div class="auth">
            <h1>Welcome back!</h1>
            <form @submit.prevent="submitForm">
                <div class="form-content">
                    <div class="form-group">
                        <label for="email-input">Email</label>
                        <n-input
                            id="email-input"
                            type="text"
                            class="input"
                            placeholder="example@gmail.com"
                            v-model:value="loginFieldValues.email"
                            :status="v$.email.$error ? 'error' : 'success'"
                            @blur="v$.email.$validate()"
                        />
                        <span class="error-text" v-show="v$.email.$error">{{
                            v$.email?.$errors[0]?.$message
                        }}</span>
                    </div>
                    <div class="form-group">
                        <label for="pass-input">Password</label>
                        <n-input
                            id="pass-input"
                            type="password"
                            class="input"
                            placeholder="1234567890"
                            v-model:value="loginFieldValues.password"
                            :status="v$.password.$error ? 'error' : 'success'"
                            @blur="v$.password.$validate()"
                        />
                        <span class="error-text" v-show="v$.password.$error">
                            {{ v$.password?.$errors[0]?.$message }}
                        </span>
                    </div>
                </div>

                <div class="form-actions">
                    <n-button
                        strong
                        secondary
                        type="success"
                        attr-type="submit"
                        :disabled="isFetching || v$.$errors.length > 0"
                    >
                        <template v-if="isFetching">
                            <n-spin size="small" />
                        </template>
                        <template v-else> Login </template>
                    </n-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { LoginFields } from './login.types'
import { NButton, NInput, NSpin } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const messageController = useMessage()

const authStore = useAuthStore()

const loginFieldValues = reactive({
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
const errorMessage = ref('')

const v$ = useVuelidate(rules, loginFieldValues)

const submitForm = async () => {
    v$.value.$validate()
    const errors = v$.value.$errors

    if (errors.length > 0) return

    login(loginFieldValues)
}

const login = async (payload: LoginFields) => {
    isFetching.value = true
    const error = await authStore.login(payload.email, payload.password)
    isFetching.value = false
    errorMessage.value = error || ''
    if (errorMessage.value) {
        messageController.error(errorMessage.value)
    } else {
        messageController.success('Success login!')
    }
}
</script>

<style lang="scss" scoped>
.auth {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 50px;
    width: 100%;
    background-color: lighten($color-black, 5%);
    padding: 2rem;

    h1 {
        text-align: center;
        margin: 0;
        margin-bottom: 1rem;
    }
}

.form-content {
    margin-bottom: 1.5rem;
}
.form-group {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    margin-bottom: 1rem;
}

.form-actions {
    display: flex;
    flex-direction: column;
}

.error-text {
    color: $color-red;
    font-size: 0.8rem;
}
</style>
