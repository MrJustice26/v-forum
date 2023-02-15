

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/variables.scss";'
                }
            }
        },
        optimizeDeps: {
            include:
              process.env.NODE_ENV === 'development'
                ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
                : []
          }
    },
    build: {
        transpile:
          process.env.NODE_ENV === 'production'
            ? [
                'naive-ui',
                'vueuc',
                '@css-render/vue3-ssr',
                '@juggle/resize-observer'
              ]
            : ['@juggle/resize-observer']
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
