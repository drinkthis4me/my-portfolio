<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()
const config = useRuntimeConfig()
const route = useRoute()

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

// Dynamically apply SEO from the fetched YAML
watchEffect(() => {
  if (home.value?.seo) {
    useSeoMeta({
      title: home.value.seo.title,
      ogTitle: home.value.seo.title,
      description: home.value.seo.description,
      ogDescription: home.value.seo.description,
      ogUrl: `${config.public.siteUrl}${route.path}`,
      ogImage: `${config.public.siteUrl}/images/og-image.png`,
      twitterCard: 'summary_large_image',
      twitterTitle: home.value.seo.title,
      twitterDescription: home.value.seo.description,
      twitterImage: `${config.public.siteUrl}/images/og-image.png`,
    })
  }
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
