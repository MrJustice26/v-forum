<template>
    <BaseContainer>
        <div
            class="text-center flex-col flex justify-center items-center bg-gray-500/20 rounded-md pb-10 px-[100px] mb-10"
        >
            <img
                class="rounded-full -mb-8 relative -top-[61px] text-center"
                src="https://placehold.co/112x112"
                alt="Author avatar"
            />
            <h1 class="text-3xl font-bold mb-4">Barack Obama</h1>
            <p class="text-lg mb-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                deleniti natus, distinctio maiores corporis veniam.
            </p>
        </div>
        <div class="flex md:gap-x-5 flex-col md:flex-row gap-y-5">
            <div class="bg-gray-500/20 py-10 w-full md:w-5/12 px-5">
                <h2 class="text-2xl font-medium mb-5 text-center">Stats</h2>
                <ul>
                    <li>100 likes</li>
                    <li>100 comments</li>
                </ul>
            </div>
            <div
                class="bg-gray-500/20 py-5 w-full md:w-7/12 px-5 overflow-y-auto h-64"
            >
                <NuxtLink :to="`/posts/${post.id}`" v-for="post in mockPosts">
                    <PostCard :post="post" :key="post.id" class="mb-5 h-auto" />
                </NuxtLink>
            </div>
        </div>
    </BaseContainer>
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
