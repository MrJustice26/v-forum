<template>
    <BaseContainer class="max-w-[960px]">
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
                        :to="`/users/${post.author._id}`"
                        class="font-medium text-xl hover:text-green-400 block"
                        >{{ post.author.username }}</NuxtLink
                    >
                    <BaseTooltip :content="post.createdAt">
                        <span class="text-slate-400">{{
                            relativeFormat(post.createdAt)
                        }}</span>
                    </BaseTooltip>
                </div>
                <div class="text-xl inline-flex gap-x-3 items-end">
                    <button
                        class="hover:text-emerald-300 text-2xl transition-colors"
                        :class="
                            postReaction === 'like' ? 'text-emerald-400' : ''
                        "
                        @click="makeReactionButtonHandler('like')"
                    >
                        <Icon name="zondicons:thumbs-down" class="rotate-180" />
                    </button>
                    <div class="w-[50px] text-center block">
                        <span class="text-emerald-400 font-medium">{{
                            computedLikes
                        }}</span>
                    </div>
                    <button
                        @click="makeReactionButtonHandler('dislike')"
                        class="hover:text-red-300 text-2xl transition-colors"
                        :class="
                            postReaction === 'dislike' ? 'text-red-400' : ''
                        "
                    >
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
                    v-for="comment in postComments"
                    :key="comment._id"
                    class="mb-10"
                >
                    <CommentCard
                        :comment="comment"
                        @reply-click="replyClick"
                        class="mb-5"
                    />
                    <ul
                        class="ms-4 ps-5 border-l border-l-emerald-400"
                        v-if="comment.replies.length > 0"
                    >
                        <li v-for="reply in comment.replies" class="mb-5">
                            <CommentCard :comment="reply" hide-reply />
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <form @submit.prevent="addComment">
            <BaseInput
                class="mb-2"
                placeholder="What's your thoughts?"
                disable-error-text
                v-model="commentContent"
            />
            <BaseButton type="submit">Add comment</BaseButton>
        </form>
    </BaseContainer>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { numberFormat } from '~~/utils/numberFormat'
import ICommentModel from '~/server/models/Comment/comment-model.type'
import IPostModel from '~/server/models/Post/post-model.type'
import { useAuthStore } from '~/stores/auth'

import { usePostReactionLogic } from '~/logic/usePostReactionLogic'

const authStore = useAuthStore()

interface Post extends Omit<IPostModel, 'author'> {
    author: {
        username: string
        _id: string
    }
    _id: string
}

const post = ref<Post>({
    title: '',
    author: {
        username: '',
        _id: '',
    },
    content: '',
    createdAt: '',
    likes: 0,
    _id: '',
})

const computedLikes = computed(() => numberFormat(post.value.likes))

interface PostComment extends Omit<ICommentModel, 'author'> {
    author: {
        username: string
        _id: string
    }
    _id: string
}

const postComments = ref<PostComment[]>([])

const route = useRoute()
const id = route.params.id as string

const postReactionLogic = usePostReactionLogic(id)
const postReaction = postReactionLogic.postReaction

const makeReactionButtonHandler = async (reactionType: 'like' | 'dislike') => {
    const likesAmount = await postReactionLogic.makeReactionButtonHandler(
        reactionType
    )
    post.value.likes = likesAmount
}

const fetchPost = async (id: string) => {
    const { data, error } = await useFetch(`/api/posts/${id}`)
    if (error.value) {
        toast.error('Something went wrong, redirecting to home page...')
        navigateTo('/')
        return
    }

    post.value = data.value as Post
}

const fetchComments = async (postId: string) => {
    const { data, error } = await useFetch('/api/comments/' + postId)
    if (error.value) {
        toast.error('Failed to load comments...')
        console.error(error.value)
        return
    }

    postComments.value = data.value as PostComment[]
}

await fetchPost(id)
await fetchComments(post.value._id)

const commentContent = ref<string>('')
const repliedOn = ref<null | string>(null)

const replyClick = (commentId: string) => {
    repliedOn.value = commentId
}

interface Comment extends Omit<ICommentModel, 'author'> {
    author: {
        _id: string
        username: string
    }
    _id: string
}

const addVisuallyComment = (commentFromDB: Comment) => {
    if (!commentFromDB.repliedOn) {
        postComments.value.push(commentFromDB)
        return
    }

    const rootComment = postComments.value.find((comment) => {
        return comment._id === commentFromDB.repliedOn
    })
    rootComment?.replies.push(commentFromDB)
}

const addComment = async () => {
    const payload = JSON.stringify({
        addedInPost: post.value._id,
        content: commentContent.value,
        repliedOn: repliedOn.value,
    })

    const { data, error } = await useFetch<ICommentModel>(
        '/api/comments/create',
        {
            method: 'POST',
            body: payload,
        }
    )
    if (data.value) {
        toast.success('Comment added!')
        addVisuallyComment({
            ...data.value,
            author: {
                _id: data.value.author,
                username: authStore.getUser?.username,
            },
        })
    } else {
        toast.error('Something went wrong on adding the comment')
        console.error(error.value)
    }

    commentContent.value = ''
    repliedOn.value = null
}
</script>
