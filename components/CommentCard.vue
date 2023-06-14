<template>
    <div class="flex items-start">
        <NuxtLink :to="`/users/${comment.author._id}`" class="mr-5 mt-[5px]">
            <img
                class="rounded-full"
                src="https://placehold.co/32x32"
                alt="Author avatar"
            />
        </NuxtLink>
        <div>
            <div class="flex items-end">
                <NuxtLink
                    :to="`/users/${comment.author._id}`"
                    class="font-medium hover:text-green-400 mr-2"
                    >{{ comment.author.username }}</NuxtLink
                >
                <span role="presentation" class="mr-2 text-gray-400">•</span>
                <p class="text-sm">{{ computedCreatedAt }}</p>
            </div>
            <p class="mb-2 line-clamp-[10]">
                {{ comment.content }}
            </p>

            <div class="flex">
                <button
                    class="text-gray-400 hover:text-emerald-300 mr-3 inline-flex items-center"
                    @click="$emit('like-click', comment._id)"
                >
                    <Icon name="solar:like-bold-duotone" class="mr-1" />
                    <span class="text-sm"> {{ comment.likes }} likes </span>
                </button>
                <button
                    class="text-gray-400 hover:text-emerald-300 inline-flex items-center"
                    @click="$emit('reply-click', comment._id)"
                    v-if="!hideReply"
                >
                    <Icon name="mdi:message-reply-text" class="mr-1" />
                    <span class="text-sm">Reply</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { relativeFormat } from '~~/utils/relativeFormat'
import ICommentModel from '~/server/models/Comment/comment-model.type'
interface CommentCard extends Omit<ICommentModel, 'author'> {
    author: {
        username: string
        _id: string
    }
    _id: string
}
const props = defineProps<{ comment: CommentCard; hideReply?: boolean }>()
const computedCreatedAt = computed(() =>
    relativeFormat(props.comment.createdAt)
)

defineEmits<{
    (e: 'like-click', commentId: string): void
    (e: 'reply-click', commentId: string): void
}>()
</script>
