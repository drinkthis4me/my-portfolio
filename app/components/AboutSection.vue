<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  content: IndexCollectionItem['about']
}>()
</script>

<template>
  <SectionTemplate id="about">
    <template #title>
      {{ content.title }}
    </template>

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
  </SectionTemplate>
</template>
