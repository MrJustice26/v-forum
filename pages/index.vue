<template>
    <BaseTooltip>
        <p>Test</p>
    </BaseTooltip>
    <section class="text-center mb-[4rem]">
        <div class="container mx-auto max-w-[1200px]">
            <h1 class="text-5xl mb-3 font-medium text-emerald-500">V-Forum</h1>
            <p>The most progressive forum for your needs.</p>
        </div>
    </section>

    <main>
        <BaseContainer>
            <div class="text-center mb-10">
                <BaseButton class="inline-flex" @click="isModalVisible = true">
                    Create post
                </BaseButton>
            </div>
            <ul>
                <li class="mb-5" v-for="post in posts">
                    <NuxtLink :key="post._id" :to="`/posts/${post._id}`">
                        <PostCard :post="post" />
                    </NuxtLink>
                </li>
            </ul>
        </BaseContainer>
    </main>
    <BaseFormModal
        :is-modal-visible="isModalVisible"
        @close="closeModalHandler"
        @submit="submitForm"
    >
        <template #header>
            <h3 class="text-2xl font-bold">Create post</h3>
        </template>
        <template #body>
            <BaseInput
                v-model="createPostFieldValues.title"
                type="text"
                label-text="Title"
                id="post-tile"
            />
            <BaseInput
                v-model="createPostFieldValues.content"
                type="text"
                label-text="Text"
                id="post-content"
                is-text-area
            />
        </template>
    </BaseFormModal>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner'

interface Post {
    author: string
    content: string
    createdAt: string
    likes: number
    title: string
    _id: string
    comments: string[]
}

const posts = ref<Post[] | []>([])
const loadRecentPosts = async () => {
    const { data, error } = await useFetch('/api/posts/get')
    posts.value = data.value
}

const isModalVisible = ref(false)

const createPostFieldValues = reactive({
    title: '',
    content: '',
})

const closeModalHandler = () => {
    createPostFieldValues.title = ''
    createPostFieldValues.content = ''
    isModalVisible.value = false
}
const submitForm = async () => {
    const payload = { ...createPostFieldValues }
    const { data, error } = await useFetch('/api/posts/create', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
    if (!error.value) {
        toast.success(`Post ${payload.title} created successfully!`)
        posts.value.unshift(data.value)
    } else {
        toast.error(`Something went wrong...`)
        console.error(error)
    }
}

loadRecentPosts()
</script>
