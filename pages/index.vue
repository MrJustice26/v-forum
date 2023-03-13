<template>
  <section class="intro">
    <div class="intro-wrapper">
      <div class="container">
        <n-h1>V-Forum</n-h1>
        <p>The most progressive forum for your needs.</p>
      </div>
    </div>
  </section>

  <main>
    <div class="container">
      <div class="chat">
        <ul class="chat-header">
          <li class="chat-header__item">Main feed</li>
        </ul>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { NH1 } from "naive-ui";
</script>
<style lang="scss" scoped>
.intro {
  background: #013220;
  padding: 1.5rem 0;
  text-align: center;
}

.chat {
  padding: 0;
  margin-top: 3rem;
  &-header {
    padding: 0;
    display: flex;
    column-gap: 1rem;
    list-style: none;
    padding: 0;
  }

  &-body {
    padding: 0;
    list-style: none;
    &__item {
      margin-bottom: 1rem;
    }
    .link {
      text-decoration: none;
    }
  }
}

.card {
  border-radius: 5px;
  padding: 0.3rem 1rem;
  color: $color-white;
  border: 1px solid $color-white;

  &:hover {
    background-color: darken($color-white, 80%);
  }
}
</style>
