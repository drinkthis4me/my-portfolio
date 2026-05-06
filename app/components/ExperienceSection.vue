<script setup lang="ts">
import type { ContentEnCollectionItem } from '@nuxt/content'

defineProps<{
  content: ContentEnCollectionItem['experience']
}>()

const sectionRef = useTemplateRef('experience')
useObserveActiveSection(sectionRef, 'experience')
</script>

<template>
  <SectionTemplate
    id="experience"
    ref="experience"
  >
    <template #title>
      {{ content.title }}
    </template>

    <div class="space-y-24">
      <div
        v-for="job in content.items"
        :key="job.date"
        class="grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        <!-- Left: Timeline/Date -->
        <div class="md:col-span-1">
          <span class="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">
            {{ job.date }}
          </span>
        </div>

        <!-- Right: Job Details -->
        <div class="md:col-span-3 space-y-2">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ job.position }}
            </h3>
            <NuxtLink
              :to="job.company.url"
              class="text-lg text-primary-500 font-medium"
            >
              {{ job.company.name }}
            </NuxtLink>
          </div>

          <p class="text-gray-600 dark:text-gray-400">
            {{ job.description }}
          </p>

          <UCollapsible v-if="job.detail && job.detail.length > 0">
            <!-- This part is always visible -->
            <template #default="{ open }">
              <UButton
                variant="ghost"
                trailing-icon="i-lucide-chevron-down"
                :label="open ? 'Show less' : 'Read more'"
                class="group mt-2 px-0 text-primary-500"
                :ui="{
                  trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
                }"
              />
            </template>

            <!-- This part slides down -->
            <template #content>
              <div class="flex flex-col gap-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <p
                  v-for="para in job.detail.split('\n\n')"
                  :key="para"
                  class="text-gray-600 dark:text-gray-400"
                >
                  {{ para }}
                </p>
              </div>
            </template>
          </UCollapsible>
        </div>
      </div>
    </div>
  </SectionTemplate>
</template>
