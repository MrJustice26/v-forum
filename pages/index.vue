<template>
    <section class="intro">
        <div class="intro-wrapper">
            <div class="container">
                <n-h1>V-Forum</n-h1>
                <p>The most progressive forum for your needs.</p>
            </div>
        </div>
    </section>

    <main>
        <div class="container">
            <header class="post-header">
                <n-button @click="isModalVisible = true"> Add post </n-button>
            </header>
            <ul class="post-list">
                <li class="post-item" v-for="post in mockPosts">
                    <div class="post-item__score">
                        {{ post.score }}
                    </div>
                    <div class="post-item__center">
                        <div class="post-item__header">
                            <n-avatar
                                :style="{
                                    color: 'white',
                                    backgroundColor: '#013220',
                                }"
                                >{{ getFirstLetter(post.author) }}</n-avatar
                            >
                            {{ post.title }}
                            <span>
                                {{ relativeFormat(post.createdAt) }}
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </main>
    <client-only>
        <n-modal v-model:show="isModalVisible" preset="dialog">
            <template #header>Create new post</template>
            <div class="form-group" style="margin-bottom: 1rem">
                <label for="title-input">Title</label>
                <n-input
                    id="title-input"
                    type="text"
                    class="input"
                    placeholder="How to ... ?"
                    v-model:value="postFieldValues.title"
                />
            </div>
            <div class="form-group" style="margin-bottom: 1rem">
                <label for="text-input">Text</label>
                <n-input
                    id="text-input"
                    type="textarea"
                    class="input"
                    placeholder="Hello, I've faced an issue..."
                    v-model:value="postFieldValues.text"
                />
            </div>
            <div class="form-group">
                <label>Images</label>
                <upload-images />
            </div>
            <template #action>
                <n-button strong secondary type="primary">Add post</n-button>
                <n-button strong ghost type="error">Cancel</n-button>
            </template>
        </n-modal>
    </client-only>

    <component :is="createdForm" />
</template>
<script setup lang="ts">
import { NH1, NAvatar, NButton, NModal, NInput } from 'naive-ui'
import { mockPosts } from '~/mocks/posts'
import { relativeFormat } from '~/utils/relativeFormat'
import { required, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useFormBuilder } from '~~/composables/useFormBuilder'
const getFirstLetter = (str: string) => str.charAt(0).toUpperCase()

const fields = [
    {
        label: 'Email',
        id: 'email',
        type: 'text',
        defaultValue: 'test@gm.com',
        placeholder: 'test@gm.com',
    },
    {
        label: 'Password',
        id: 'password',
        type: 'password',
        placeholder: '123456',
    },
    {
        label: 'Repeat password',
        id: 'rpassword',
        type: 'password',
        placeholder: '123456',
    },
]
const createdForm = useFormBuilder({
    title: 'Create something',
    fields,
    onSubmit: () => console.log('Hello world'),
    rules: {
        email: {
            required: true,
            message: 'Please input your email',
            trigger: ['input', 'blur'],
        },
        password: {
            required: true,
            message: 'Please input your password',
            trigger: ['input', 'blur'],
        },
        rpassword: {
            required: true,
            message: 'Please input your password',
            sameAs: 'password',
            trigger: ['input', 'blur'],
        },
    },
})

console.log(createdForm)
const isModalVisible = ref(false)

interface PostFieldValues {
    title: string
    text: string
    images: { src: string; alt: string }[]
}

const rules = {
    title: {
        required: helpers.withMessage('Title is required!', required),
    },
    text: {
        required: helpers.withMessage('Text is required!', required),
        minLength: minLength(60),
    },
}

const postFieldValues: PostFieldValues = reactive({
    title: '',
    text: '',
    images: [],
})

const v$ = useVuelidate(rules, postFieldValues)
</script>
<style lang="scss" scoped>
.intro {
    background: #013220;
    padding: 1.5rem 0;
    text-align: center;
}

.post {
    &-header {
        padding-top: 1rem;
        text-align: center;
    }
    &-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
}
</style>
