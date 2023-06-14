<template>
    <Html lang="en">
        <Head>
            <Title>V-Forum</Title>
            <Link rel="preconnect" href="https://fonts.googleapis.com" />
            <Link rel="preconnect" href="https://fonts.gstatic.com" />
            <Link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap"
            />
        </Head>
    </Html>

    <NuxtLayout>
        <NuxtPage />
        <ClientOnly>
            <Toaster
                richColors
                closeButton
                theme="dark"
                position="top-center"
            />
        </ClientOnly>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>
