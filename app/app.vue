<script setup lang="ts">
import { en, zh_tw } from '@nuxt/ui/locale'

const { locale } = useI18n()

const appLocale = computed(() => locale.value === 'zh' ? zh_tw : en)
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
