<script setup lang="ts">
const { t } = useI18n()
const { ogImage } = useOgImage()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),

  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
  ogImage: () => ogImage.value,

  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.home.title'),
  twitterDescription: () => t('seo.home.description'),
  twitterImage: () => ogImage.value,
})
</script>

<template>
  <div>
    <HeroSection />

    <AboutSection />

    <ExpertiseSection />

    <WorkSection />

    <ContactSection />
  </div>
</template>
