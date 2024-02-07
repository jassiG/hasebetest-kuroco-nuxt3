// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        // Public keys that are exposed to the client
        public: {
            apiBase: 'https://hasebetest.g.kuroco.app'
        }
    },
    modules: ['@pinia/nuxt']
})
