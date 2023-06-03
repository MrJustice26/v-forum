<template>
    <BaseContainer class="max-w-[720px]">
        <h1 class="text-5xl mb-10 text-white font-bold">{{ post.title }}</h1>
        <div class="mb-10 flex items-center">
            <img
                class="rounded-full mr-5"
                src="https://placehold.co/48x48"
                alt="Author avatar"
            />
            <div class="flex items-center justify-between w-full">
                <div>
                    <NuxtLink
                        :to="`/users/${user._id}`"
                        class="font-medium text-xl hover:text-green-400"
                        >{{ user.username }}</NuxtLink
                    >
                    <span class="block text-slate-400">{{
                        relativeFormat(post.createdAt)
                    }}</span>
                </div>
                <div class="text-xl inline-flex gap-x-3 items-end">
                    <button class="hover:text-emerald-400 text-2xl">
                        <Icon name="zondicons:thumbs-down" class="rotate-180" />
                    </button>
                    <span class="text-emerald-400 font-medium">{{
                        computedScore
                    }}</span>
                    <button class="hover:text-emerald-400 text-2xl">
                        <Icon name="zondicons:thumbs-down" />
                    </button>
                </div>
            </div>
        </div>
        <p class="text-xl mb-10">
            {{ post.content }}
        </p>
        <hr class="border-emerald-800 mb-10" />
        <div>
            <h2 class="text-3xl font-medium mb-7">Comments</h2>
            <ul class="mb-10">
                <li
                    v-for="comment in mockComments"
                    :key="comment.id"
                    class="mb-5"
                >
                    <CommentCard :comment="comment" />
                </li>
            </ul>
            <div class="text-center mb-10">
                <BaseButton
                    class="!text-emerald-500 hover:!text-emerald-500 hover:!bg-transparent !bg-transparent"
                    >Load more comments...</BaseButton
                >
            </div>
        </div>
        <div>
            <BaseInput
                class="mb-2"
                placeholder="What's your thoughts?"
                disable-error-text
            />
            <BaseButton>Add comment</BaseButton>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { numberFormat } from '~~/utils/numberFormat'

interface Post {
    title: string
    author: string
    comments: string[]
    content: string
    createdAt: string
    score: number
    _id: string
}

const post = ref<Post>({
    title: '',
    author: '',
    comments: [],
    content: '',
    createdAt: '',
    score: 0,
    _id: '',
})

const computedScore = computed(() => numberFormat(post.value.score))

interface User {
    activationLink: string
    email: string
    isActivated: boolean
    password: string
    username: string
    _id: string
}

const user = ref<User>({
    activationLink: '',
    email: '',
    isActivated: false,
    password: '',
    username: '',
    _id: '',
})

const mockComments = [
    {
        authorText: 'Barack Obama',
        id: 1,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        points: 10,
        createdAt: new Date('2022-01-01'),
    },
    {
        authorText: 'Barack Obama',
        id: 2,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        points: 1000,
        createdAt: new Date('2022-10-01'),
    },
    {
        authorText: 'Barack Obama',
        id: 3,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        points: 1_300_500,
        createdAt: new Date('2023-05-01'),
    },
]

const route = useRoute()
const id = route.params.id as string

const fetchPost = async (id: string) => {
    const { data, error } = await useFetch(`/api/posts/${id}`)
    if (error.value) {
        toast.error('Something went wrong, redirecting to home page...')
        navigateTo('/')
        return
    }

    post.value = data.value as Post
    console.log(post.value)
}

const fetchUser = async (userId: string) => {
    const { data, error } = await useFetch(`/api/users/${userId}`)
    if (error.value) {
        toast.error('Something went wrong, redirecting to home page...')
        navigateTo('/')
        return
    }

    user.value = data.value as User
    console.log(post.value)
}

await fetchPost(id)
await fetchUser(post.value.author)
</script>
