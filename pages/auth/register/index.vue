<template>
  <div class="container">
    <div class="auth">
      <h1>Let's get it started!</h1>
      <v-alert variant="danger" v-if="errorMessage">
        Error: {{ errorMessage }}
      </v-alert>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email-input">Email</label>
          <v-input
            id="email-input"
            type="text"
            class="input"
            placeholder="example@gmail.com"
            v-model="registerFieldValues.email"
            :is-error="!!errors.email"
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
            v-model="registerFieldValues.password"
            :is-error="!!errors.password"
          />
          <span class="error-text">{{ errors.password }}</span>
        </div>
        <div class="form-group">
          <label for="rpass-input">Repeat password</label>
          <v-input
            id="rpass-input"
            type="password"
            class="input"
            placeholder="1234567890"
            v-model="registerFieldValues.rpassword"
            :is-error="!!errors.rpassword"
          />
          <span class="error-text">{{ errors.rpassword }}</span>
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
import { RegisterFields, RegisterFieldsErrors } from "./register.types";
import registerValidate from "./validate";

const authStore = useAuthStore();

const registerFieldValues: Ref<RegisterFields> = ref({
  email: "",
  password: "",
  rpassword: "",
});

const isFetching = ref(false);
const errorMessage = ref("");

const errors: Ref<RegisterFieldsErrors> = ref({});

const submitForm = () => {
  const receivedErrors: RegisterFieldsErrors = registerValidate(
    registerFieldValues.value
  );
  errors.value = receivedErrors;

  if (Object.keys(errors.value).length) return;

  const formValues = JSON.parse(JSON.stringify(registerFieldValues.value));
  delete formValues.rpassword;

  register(formValues);
};

const register = async (payload: Omit<RegisterFields, "rpassword">) => {
  isFetching.value = true;
  const error = await authStore.register(payload.email, payload.password);
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

.form-group {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  margin-bottom: 1.5rem;
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
