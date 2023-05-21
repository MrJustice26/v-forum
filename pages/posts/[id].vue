<template>
    <BaseContainer class="max-w-[720px]">
        <h1 class="text-5xl mb-10 text-white font-bold">Hello world</h1>
        <div class="mb-10 flex items-center">
            <img
                class="rounded-full mr-5"
                src="https://placehold.co/48x48"
                alt="Author avatar"
            />
            <div class="flex items-center justify-between w-full">
                <div>
                    <NuxtLink
                        to="users/1"
                        class="font-medium text-xl hover:text-green-400"
                        >Barack Obama</NuxtLink
                    >
                    <p>
                        Published in
                        <span class="fond-medium text-emerald-500"
                            >JavaScript</span
                        >
                    </p>
                </div>
                <div class="text-xl inline-flex gap-x-3 items-end">
                    <button class="hover:text-emerald-400 text-2xl">
                        <Icon name="zondicons:thumbs-down" class="rotate-180" />
                    </button>
                    <span class="text-emerald-400 font-medium">{{
                        numberFormat(1_500)
                    }}</span>
                    <button class="hover:text-emerald-400 text-2xl">
                        <Icon name="zondicons:thumbs-down" />
                    </button>
                </div>
            </div>
        </div>
        <p class="text-xl mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            sapiente sunt ut praesentium dolor provident?
        </p>
        <hr class="border-emerald-800 mb-10" />
        <div>
            <h2 class="text-3xl font-medium mb-5">Comments</h2>
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
                <BaseButton>Load more comments...</BaseButton>
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
import { numberFormat } from '~~/utils/numberFormat'
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
</script>
