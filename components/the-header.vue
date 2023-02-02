<template>
  <header>
    <nav class="container">
      <div class="col">
        <v-link to="/" class="main-link">V-Forum</v-link>
      </div>
      <div class="col">
        <v-link to="/">Home</v-link>
        <v-link to="/login">Log in</v-link>
        <v-link to="/signup">Register</v-link>
      </div>
      <div class="col"></div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
header {
  border-bottom: 1px solid $color-black;
}
nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
}
.col {
  display: flex;
  align-items: center;
  column-gap: 2rem;
  a {
    color: white;
    text-decoration: none;
  }
}
</style>
