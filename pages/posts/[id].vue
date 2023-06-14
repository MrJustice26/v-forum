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
                        :to="`/users/${post.author._id}`"
                        class="font-medium text-xl hover:text-green-400"
                        >{{ post.author.username }}</NuxtLink
                    >
                    <span class="block text-slate-400">{{
                        relativeFormat(post.createdAt)
                    }}</span>
                </div>
                <div class="text-xl inline-flex gap-x-3 items-end">
                    <button
                        class="hover:text-emerald-300 text-2xl transition-colors"
                        :class="
                            postReaction === PostReaction.LIKE
                                ? 'text-emerald-400'
                                : ''
                        "
                        @click="makeLikeButtonHandler"
                    >
                        <Icon name="zondicons:thumbs-down" class="rotate-180" />
                    </button>
                    <div class="w-[50px] text-center block">
                        <span class="text-emerald-400 font-medium">{{
                            computedLikes
                        }}</span>
                    </div>
                    <button
                        @click="makeDislikeButtonHandler"
                        class="hover:text-red-300 text-2xl transition-colors"
                        :class="
                            postReaction === PostReaction.DISLIKE
                                ? 'text-red-400'
                                : ''
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
                    class="mb-5"
                >
                    <CommentCard :comment="comment" @reply-click="replyClick" />
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
                v-model="commentContent"
            />
            <BaseButton @click="addComment">Add comment</BaseButton>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { numberFormat } from '~~/utils/numberFormat'
import ICommentModel from '~/server/models/Comment/comment-model.type'
import IPostModel from '~/server/models/Post/post-model.type'

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

// =============== POST REACTION =============== //

enum PostReaction {
    LIKE = 'like',
    DISLIKE = 'dislike',
    SWITCH_TO_LIKE = 'switchToLike',
    SWITCH_TO_DISLIKE = 'switchToDislike',
    FROM_LIKE_TO_NONE = 'fromLikeToNone',
    FROM_DISLIKE_TO_NONE = 'fromDislikeToNone',
    NONE = 'none',
}
const postReaction = ref<PostReaction>(PostReaction.NONE)

const makeLikeButtonHandler = () => {
    switch (postReaction.value) {
        case PostReaction.LIKE:
            postReaction.value = PostReaction.FROM_LIKE_TO_NONE
            break

        case PostReaction.DISLIKE:
            postReaction.value = PostReaction.SWITCH_TO_LIKE
            break

        case PostReaction.NONE:
            postReaction.value = PostReaction.LIKE
            break

        default:
            break
    }

    fetchPostReaction()
}

const makeDislikeButtonHandler = () => {
    switch (postReaction.value) {
        case PostReaction.DISLIKE:
            postReaction.value = PostReaction.FROM_DISLIKE_TO_NONE
            break

        case PostReaction.LIKE:
            postReaction.value = PostReaction.SWITCH_TO_DISLIKE
            break

        case PostReaction.NONE:
            postReaction.value = PostReaction.DISLIKE
            break

        default:
            break
    }

    fetchPostReaction()
}

const performFromSwitchToDefaultReaction = () => {
    switch (postReaction.value) {
        case PostReaction.SWITCH_TO_DISLIKE:
            postReaction.value = PostReaction.DISLIKE
            break

        case PostReaction.SWITCH_TO_LIKE:
            postReaction.value = PostReaction.LIKE
            break

        case PostReaction.FROM_LIKE_TO_NONE:
            postReaction.value = PostReaction.NONE
            break

        case PostReaction.FROM_DISLIKE_TO_NONE:
            postReaction.value = PostReaction.NONE
            break
    }
}

const fetchPostReaction = async () => {
    const postId = post.value._id

    const payload = JSON.stringify({
        postId,
        postReaction: postReaction.value,
    })

    const { data, error } = await useFetch('/api/posts/perform-reaction', {
        method: 'POST',
        body: payload,
    })

    if (error.value) {
        toast.error('Something went wrong, redirecting to home page...')
        navigateTo('/')
        return
    }

    post.value.likes =
        data.value?.likes === undefined ? post.value.likes : data.value.likes
    performFromSwitchToDefaultReaction()
}

// =============== /POST REACTION =============== //

const commentContent = ref<string>('')
const repliedOn = ref<null | string>(null)

const replyClick = (commentId: string) => {
    repliedOn.value = commentId
}

const addComment = async () => {
    const payload = JSON.stringify({
        addedInPost: post.value._id,
        content: commentContent.value,
        repliedOn: repliedOn.value,
    })

    const { data, error } = await useFetch('/api/comments/create', {
        method: 'POST',
        body: payload,
    })
    if (data.value) {
        toast.success('Comment added!')
        console.log(data.value)
    } else {
        toast.error('Something went wrong on adding the comment')
        console.error(error.value)
    }

    commentContent.value = ''
    repliedOn.value = null
}
</script>
