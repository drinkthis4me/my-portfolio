<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  content: IndexCollectionItem['about']
}>()
</script>

<template>
  <section
    id="about"
    class="py-24 sm:py-32 overflow-hidden bg-white dark:bg-gray-900"
  >
    <UContainer>
      <div class="mb-20">
        <h2 class="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-gray-900 dark:text-white">
          {{ content.title }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div class="flex flex-col h-full justify-center">
          <div class="flex flex-col gap-y-2 text-gray-600 dark:text-gray-400 mb-10">
            <p
              v-for="(para, index) in content.description.split('\n\n')"
              :key="index"
            >
              {{ para }}
            </p>
          </div>
        </div>

        <div class="relative group max-w-md mx-auto md:mx-0">
          <div class="absolute -inset-4 bg-primary-500/20 rounded-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
          <div class="relative aspect-3/4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl">
            <NuxtImg
              :src="content.image.src"
              :alt="content.image.alt"
              format="webp"
              loading="lazy"
              placeholder
              class="w-full h-full"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
