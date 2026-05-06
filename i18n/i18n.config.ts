import en from './locales/en.json'
import zh from './locales/zh.json'

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages: {
      zh,
      en,
    },
  }
})
