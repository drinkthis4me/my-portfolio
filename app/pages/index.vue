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
    <section
      id="skills"
      class="h-screen"
    >
      Skills
    </section>
    <section
      id="contact"
      class="h-screen"
    >
      Contact
    </section>
  </div>
</template>
