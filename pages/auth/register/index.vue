<template>
  <div class="container">
    <div class="auth">
      <h1>Let's get it started!</h1>
      <form>
        <div class="form-group">
          <label for="email-input">Email</label>
          <v-input
            id="email-input"
            type="text"
            class="input"
            placeholder="example@gmail.com"
          />
        </div>
        <div class="form-group">
          <label for="pass-input">Password</label>
          <v-input
            id="pass-input"
            type="password"
            class="input"
            placeholder="1234567890"
          />
        </div>
        <div class="form-group">
          <label for="rpass-input">Repeat password</label>
          <v-input
            id="rpass-input"
            type="password"
            class="input"
            placeholder="1234567890"
          />
        </div>

        <div class="form-actions">
          <v-button class="btn btn-primary" type="submit">Register</v-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
