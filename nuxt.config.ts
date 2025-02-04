// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,

    runtimeConfig: {
        // Public keys that are exposed to the client
        public: {
            gcpKey: process.env.GCP_KEY,
            apiBase: 'https://hasebetest2.g.kuroco.app',
            staticToken: process.env.NUXT_STATIC_TOKEN,
            publicApiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
        }
    },

    modules: [
        '@pinia/nuxt',
        [
            "@nuxtjs/i18n",
            {
                strategy: "prefix_and_default",
                // Define the language options
                locales: [
                    { code: "ja", file: "ja.json" },
                    { code: "en", file: "en.json" },
                ],
                // Set the default language
                defaultLocale: "ja",
                vueI18nLoader: true,
                lazy: true,
                // Specify the directory for the JSON file
                langDir: "locales/",
            },
        ],
        'nuxt-gtag',
    ],

    gtag: {
        id: 'G-2BPFFX57F6'
      }
})