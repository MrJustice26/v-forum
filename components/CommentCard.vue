<template>
    <div class="flex items-start">
        <NuxtLink to="users/1" class="mr-5">
            <img
                class="rounded-full"
                src="https://placehold.co/32x32"
                alt="Author avatar"
            />
        </NuxtLink>
        <div>
            <div class="flex items-end">
                <NuxtLink
                    to="users/1"
                    class="font-medium hover:text-green-400 mr-2"
                    >{{ comment.authorText }}</NuxtLink
                >
                <span role="presentation" class="mr-2 text-gray-400">•</span>
                <p class="text-sm">{{ computedCreatedAt }}</p>
            </div>
            <p class="mb-2 line-clamp-[10]">
                {{ comment.text }}
            </p>

            <div class="flex">
                <button
                    class="text-gray-400 hover:text-emerald-300 mr-3 inline-flex items-center"
                >
                    <Icon name="solar:like-bold-duotone" class="mr-1" />
                    <span class="text-sm"> {{ comment.points }} likes </span>
                </button>
                <button
                    class="text-gray-400 hover:text-emerald-300 inline-flex items-center"
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
interface CommentCard {
    authorText: string
    text: string
    points: number
    id: number
    createdAt: Date
}

const props = defineProps<{ comment: CommentCard }>()
const computedCreatedAt = computed(() =>
    relativeFormat(props.comment.createdAt.toISOString())
)
</script>
