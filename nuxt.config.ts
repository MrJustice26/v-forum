

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
    app: {
        head: {
            link: [
                {
                    rel: 'preconnect',
                    href:'https://fonts.googleapis.com'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com'
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap'
                }
            ]
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
