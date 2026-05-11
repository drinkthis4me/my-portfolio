// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      siteUrl: 'http://localhost:3000',
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true },
  },

  compatibilityDate: '2025-07-15',

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'zh', name: '繁體中文', language: 'zh-Hant', file: 'zh.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    vueI18n: './i18n/i18n.config.ts',
  },
})
