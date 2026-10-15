<script setup lang="ts">
import { MotionConfig } from 'motion-v'

const i18nHead = useLocaleHead()

useHeadSafe(i18nHead)

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
}))

useSeoMeta({
  titleTemplate: '%s | James Wang',
  description: 'Build seamless digital experiences, one pixel and line of code at a time.',
  ogType: 'website',
  ogSiteName: 'James Wang',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <MotionConfig
      reduced-motion="user"
      :transition="{
        duration: 0.45,
        ease: 'easeOut',
      }"
    >
      <AppHeader />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <AppFooter />
    </MotionConfig>
  </div>
</template>
