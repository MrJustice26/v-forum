<template>
    <div
        class="py-5 px-6 bg-slate-600/10 rounded-md border-slate-800 border w-full hover:border-emerald-400 transition-colors flex max-h-[600px]"
    >
        <div>
            <div
                class="flex justify-center items-center flex-col h-full gap-y-1 mr-5"
            >
                <Icon
                    class="text-3xl text-emerald-400"
                    name="tabler:square-chevron-up"
                />
                <span class="text-emerald-400 w-[45px] text-center truncate">{{
                    computedScore
                }}</span>
                <Icon
                    class="text-3xl text-emerald-400"
                    name="tabler:square-chevron-down"
                />
            </div>
        </div>
        <div>
            <h3 class="text-xl text-emerald-400 mb-2 font-medium">
                {{ post.title }}
            </h3>
            <p class="line-clamp-2">
                {{ post.content }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { numberFormat } from '~~/utils/numberFormat'
interface PostCard {
    title: string
    content: string
    score: number
}

const props = defineProps<{ post: PostCard }>()
const computedScore = computed(() => numberFormat(props.post.score))
</script>
