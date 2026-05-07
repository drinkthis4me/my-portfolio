<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()

// Fetch localized content
const { data: home } = await useAsyncData(`home-${locale.value}`, async () => {
  const collection = (`content_${locale.value}`) as keyof Collections
  const content = queryCollection(collection).first()

  // Default to 'zh' content
  if (!content && locale.value !== 'zh') {
    const defaultCollection = 'content_zh' as keyof Collections
    return await queryCollection(defaultCollection).first()
  }

  return content
}, {
  watch: [locale],
})

if (!home.value) {
  throw createError({
    status: 404,
    statusText: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: home.value?.seo.title,
  description: home.value?.seo.description,
})
</script>

<template>
  <div v-if="home">
    <HeroSection :content="home.hero" />

    <ScrollReveal>
      <AboutSection
        :content="home.about"
        class="py-8 sm:py-16"
      />
    </ScrollReveal>

    <ScrollReveal>
      <ExperienceSection
        :content="home.experience"
        class="py-8 sm:py-16"
      />
    </ScrollReveal>

    <ScrollReveal>
      <SkillsSection
        :content="home.skills"
        class="py-8 sm:py-16"
      />
    </ScrollReveal>

    <ScrollReveal>
      <ContactSection
        :content="home.contact"
        class="py-8 sm:py-16"
      />
    </ScrollReveal>
  </div>
</template>
