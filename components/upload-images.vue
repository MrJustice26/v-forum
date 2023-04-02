<template>
    <n-upload
        action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        :default-file-list="fileList"
        list-type="image-card"
    />
</template>

<script setup lang="ts">
import { NUpload } from 'naive-ui'
import { Ref } from 'vue'
import type { UploadFileInfo } from 'naive-ui'
const fileList: Ref<UploadFileInfo[]> = ref([
    {
        id: 'a',
        name: '我是上传出错的普通文件.png',
        status: 'error',
    },
    {
        id: 'b',
        name: '我是普通文本.doc',
        status: 'finished',
        type: 'text/plain',
    },
    {
        id: 'c',
        name: '我是自带url的图片.png',
        status: 'finished',
        url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    },
    {
        id: 'd',
        name: '我是上传进度99%的文本.doc',
        status: 'uploading',
        percentage: 99,
    },
])
</script>
