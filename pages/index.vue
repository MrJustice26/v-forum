<template>
  <section class="intro">
    <div class="intro-wrapper">
      <div class="container">
        <h1>V-Forum</h1>
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
        <ul class="chat-body">
          <li v-for="post in posts" class="chat-body__item">
            <NuxtLink class="link" :to="`/posts/${post.id}`">
              <div class="card">
                <h3>{{ post.title }}</h3>
                <p>{{ post.body }}</p>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const posts: Ref<Post[] | []> = ref([]);

const fetchPosts = async (): Promise<void> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts.value = await response.json();
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => fetchPosts());
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
