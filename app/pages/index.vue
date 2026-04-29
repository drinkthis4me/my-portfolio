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
    <section
      id="about"
      class="h-screen"
    >
      About
    </section>
    <section
      id="experience"
      class="h-screen"
    >
      Experience
    </section>
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
