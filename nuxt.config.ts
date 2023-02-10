

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/variables.scss";'
                }
            }
        }
    },
    css: [
        "@/assets/scss/main.scss"
    ],
    nitro: {
        plugins: ['~/server/index.ts']
    },
    modules: [
        '@pinia/nuxt'
    ],
    runtimeConfig: {
        mongodbUsername: process.env.MONGODB_USERNAME,
        mongodbPassword: process.env.MONGODB_PASSWORD,
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
        jwtAccessSecret: process.env.JWT_ACCESS_SECRET
    },
})
