// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/assets/scss/main.scss'],
    nitro: {
        plugins: ['~/server/index.ts'],
    },
    build: {
        transpile: ['vue-sonner'],
    },
    modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
    runtimeConfig: {
        mongodbUsername: process.env.MONGODB_USERNAME,
        mongodbPassword: process.env.MONGODB_PASSWORD,
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
        jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_PORT: process.env.MAIL_PORT,
        MAIL_USER: process.env.MAIL_USER,
        MAIL_PASS: process.env.MAIL_PASS,
    },
})
