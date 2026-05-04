<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  content: IndexCollectionItem['skills']
}>()
</script>

<template>
  <SectionTemplate id="skills">
    <template #title>
      {{ content.title }}
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard
        v-for="category in content.category"
        :key="category.name"
        class="hover:ring-2 hover:ring-primary-500 hover:bg-primary-500/10 transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <template #header>
          <h3 class="font-bold text-lg text-gray-900 dark:text-white">
            {{ category.name }}
          </h3>
          <p
            v-if="category.description"
            class="text-xs text-gray-500 dark:text-gray-400"
          >
            {{ category.description }}
          </p>
        </template>

        <div class="space-y-3">
          <div
            v-for="skill in category.items"
            :key="skill.name"
            class="flex items-center gap-3 group/item"
          >
            <UIcon
              :name="skill.icon"
              class="w-5 h-5 shrink-0 grayscale group-hover/item:grayscale-0 transition-all duration-300"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </UCard>
    </div>
  </SectionTemplate>
</template>
