<script setup lang="ts">
import { en, zh_tw } from '@nuxt/ui/locale'

const { locale } = useI18n()

const appLocale = computed(() => locale.value === 'zh' ? zh_tw : en)
const lang = computed(() => appLocale.value.code)
const dir = computed(() => appLocale.value.dir)

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
})
</script>

<template>
  <UApp :locale="appLocale">
    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />

    <AppBackToTopButton />
  </UApp>
</template>
