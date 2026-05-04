<script setup lang="ts">
const { data: home } = await useAsyncData('home', () =>
  queryCollection('index').first(),
)
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

    <AboutSection :content="home.about" />

    <ExperienceSection :content="home.experience" />

    <SkillsSection :content="home.skills" />

    <ContactSection :content="home.contact" />
  </div>
</template>
