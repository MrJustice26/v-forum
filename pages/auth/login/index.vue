<template>
  <div class="container">
    <div class="auth">
      <h1>Welcome back!</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email-input">Email</label>
          <v-input
            id="email-input"
            type="text"
            placeholder="example@gmail.com"
            v-model="loginFieldValues.email.value"
          />
        </div>
        <div class="form-group">
          <label for="pass-input">Password</label>
          <v-input
            id="pass-input"
            type="text"
            placeholder="1234567890"
            v-model="loginFieldValues.password.value"
          />
        </div>

        <div class="form-actions">
          <v-button class="btn btn-primary" type="submit">Login</v-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { LoginFields, LoginFieldsErrors } from "./login.types";
import loginValidate from "./validate";

const loginFieldValues: Ref<LoginFields> = ref({
  email: {
    value: "",
    istouched: false,
  },
  password: {
    value: "",
    istouched: false,
  },
});

const submitForm = () => {
  const errors: LoginFieldsErrors = loginValidate(loginFieldValues.value);
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
  &:not(:last-child) {
    margin-bottom: 30px;
  }
}

.form-actions {
  display: flex;
  flex-direction: column;
}
</style>
