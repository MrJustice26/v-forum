// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/assets/scss/main.scss'],
    nitro: {
        plugins: ['~/server/index.ts'],
    },
    build: {
        transpile: ['vue-sonner'],
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        '@vueuse/nuxt',
        '@nuxtjs/cloudinary',
    ],
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => ['Toaster'].includes(tag),
        },
    },
    runtimeConfig: {
        mongodbUsername: process.env.MONGODB_USERNAME,
        mongodbPassword: process.env.MONGODB_PASSWORD,
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
        jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_PORT: process.env.MAIL_PORT,
        MAIL_USER: process.env.MAIL_USER,
        MAIL_PASS: process.env.MAIL_PASS,

        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
    devtools: {
        enabled: true,
    },
})
