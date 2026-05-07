<script setup lang="ts">
import type { ContentEnCollectionItem } from '@nuxt/content'

const props = defineProps<{
  content: ContentEnCollectionItem['contact']
}>()

const sectionRef = useTemplateRef('contact')
useObserveActiveSection(sectionRef, 'contact')

const { t } = useI18n()
const copied = ref(false)

const copyEmail = () => {
  navigator.clipboard.writeText(props.content.email)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <SectionTemplate
    id="contact"
    ref="contact"
    class="relative"
  >
    <template #title>
      {{ content.title }}
    </template>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-primary-500/20 blur-[120px] rounded-full -z-5" />

    <div class="text-center space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl md:text-4xl font-black tracking-tighter">
          {{ content.headline }}
        </h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {{ content.subheadline }}
        </p>
      </div>

      <div class="flex flex-col items-center justify-center space-y-6">
        <div class="relative flex gap-4">
          <a
            :href="`mailto:${content.email}`"
            class="text-2xl md:text-4xl font-mono font-bold tracking-tight text-gray-900 dark:text-white hover:text-primary-500 transition-colors duration-300"
          >
            {{ content.email }}
          </a>
          <UButton
            icon="i-lucide-copy"
            variant="ghost"
            color="primary"
            @click.prevent="copyEmail"
          />
          <Transition name="fade">
            <span
              v-if="copied"
              class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-primary-500 font-bold"
            >
              {{ t('general.copiedToClipboard') }}
            </span>
          </Transition>
        </div>

        <div class="flex gap-8 pt-8">
          <NuxtLink
            v-for="social in content.socials"
            :key="social.name"
            :to="social.url"
            target="_blank"
            class="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <UIcon
              :name="social.icon"
              class="w-6 h-6 dark:bg-white rounded-full"
            />
            <span class="font-bold tracking-widest text-xs">{{ social.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </SectionTemplate>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
