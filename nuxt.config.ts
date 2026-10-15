import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/icon',
    'motion-v/nuxt',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'monokai',
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: 'http://localhost:3000',
      i18n: {
        baseUrl: 'http://localhost:3000',
      },
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/work/**': { prerender: true },

    '/en': { prerender: true },
    '/en/about': { prerender: true },
    '/en/work/**': { prerender: true },
  },

  compatibilityDate: '2026-10-10',

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: ['400 700'],
        styles: ['normal', 'italic'],
        global: true,
      },
      {
        name: 'Noto Sans TC',
        provider: 'google',
        weights: ['400 700'],
        styles: ['normal'],
        global: true,
      },
    ],
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'zh', name: '繁體中文', language: 'zh-Hant', file: 'zh.json', isCatchallLocale: true },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    detectBrowserLanguage: false,
  },
})
