<script setup lang="ts">
import type { ContentEnCollectionItem } from '@nuxt/content'

const props = defineProps<{
  content: ContentEnCollectionItem['hero']
}>()

const sectionRef = useTemplateRef('hero')
useObserveActiveSection(sectionRef, 'hero')

const heroTitle = computed(() => {
  const [primary, ...secondaryParts] = (props.content?.headline ?? '').split('\n')

  return {
    primary,
    secondary: secondaryParts.join(' ').trim(),
  }
})
</script>

<template>
  <section
    id="hero"
    ref="hero"
    class="relative min-h-[90vh] flex items-center justify-center py-12 overflow-hidden"
  >
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary-500/20 blur-[120px] rounded-full -z-10" />

    <UContainer class="text-center">
      <h1 class="text-6xl md:text-8xl font-black tracking-tight mb-8 text-gray-900 dark:text-white">
        {{ heroTitle.primary }} <br>
        <span class="text-primary-500">{{ heroTitle.secondary }}</span>
      </h1>

      <p class="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
        {{ props.content?.subheadline }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <UButton
          size="xl"
          color="primary"
          :label="props.content?.cta_primary"
          to="#contact"
          icon="i-lucide-arrow-right"
          trailing
          class="px-8"
        />
      </div>

      <div class="opacity-50 grayscale hover:grayscale-0 transition-all duration-200">
        <UMarquee
          pause-on-hover
          :overlay="false"
        >
          <UIcon
            v-for="logo in props.content?.logos.items"
            :key="logo"
            :name="logo"
            class="w-8 h-8"
          />
        </UMarquee>
      </div>
    </UContainer>
  </section>
</template>
