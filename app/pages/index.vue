<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
})
</script>

<template>
  <div>
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
