<template>
    <section class="text-center mb-[4rem]">
        <div class="container mx-auto max-w-[1200px]">
            <h1 class="text-5xl mb-3 font-medium text-emerald-500">V-Forum</h1>
            <p>The most progressive forum for your needs.</p>
        </div>
    </section>

    <main>
        <BaseContainer>
            <div class="text-center mb-10">
                <BaseButton class="inline-flex"> Create post </BaseButton>
            </div>
            <ul>
                <li class="mb-5" v-for="post in mockPosts">
                    <NuxtLink :key="post.id" :to="`/posts/${post.id}`">
                        <PostCard :post="post" />
                    </NuxtLink>
                </li>
            </ul>
        </BaseContainer>
    </main>
</template>
<script setup lang="ts">
const mockPosts = [
    {
        id: 1,
        title: 'Hello world',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        points: 10,
    },
    {
        id: 2,
        title: 'Hello world',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        points: 1000,
    },
    {
        id: 3,
        title: 'Hello world',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        points: 1_300_500,
    },
]
</script>
