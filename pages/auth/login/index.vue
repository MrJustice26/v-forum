<template>
  <div class="container">
    <div class="auth">
      <h1>Welcome back!</h1>
      <v-alert variant="danger" v-if="errorMessage">
        Error: {{ errorMessage }}
      </v-alert>
      <form @submit.prevent="submitForm">
        <div class="form-content">
          <div class="form-group">
            <label for="email-input">Email</label>
            <v-input
              id="email-input"
              type="text"
              class="input"
              placeholder="example@gmail.com"
              v-model="loginFieldValues.email"
              :is-error="!!errors.password"
            />
            <span class="error-text">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label for="pass-input">Password</label>
            <v-input
              id="pass-input"
              type="password"
              class="input"
              placeholder="1234567890"
              v-model="loginFieldValues.password"
              :is-error="!!errors.password"
            />
            <span class="error-text">{{ errors.password }}</span>
          </div>
        </div>

        <div class="form-actions">
          <v-button variant="success" :disabled="isFetching" type="submit"
            >Register</v-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { LoginFields, LoginFieldsErrors } from "./login.types";
import loginValidate from "./validate";

const authStore = useAuthStore();

const loginFieldValues: Ref<LoginFields> = ref({
  email: "",
  password: "",
});

const isFetching = ref(false);
const errorMessage = ref("");

const errors: Ref<LoginFieldsErrors> = ref({});

const submitForm = async () => {
  const receivedErrors: LoginFieldsErrors = loginValidate(
    loginFieldValues.value
  );
  errors.value = receivedErrors;

  const keysAmount = Object.keys(errors.value).length;
  if (keysAmount) return;

  login(loginFieldValues.value);
};

const login = async (payload: LoginFields) => {
  isFetching.value = true;
  const error = await authStore.login(payload.email, payload.password);
  isFetching.value = false;
  errorMessage.value = error || "";
};
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
