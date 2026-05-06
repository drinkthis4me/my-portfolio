<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { SECTIONS } from '~/composables/useActiveSection'

const { t } = useI18n()
const localePath = useLocalePath()
const activeSection = useActiveSection()

// Links for <UNavigationMenu>
const links = computed<NavigationMenuItem[]>(() =>
  // Ignore HeroSection
  SECTIONS.slice(1).map(id => ({
    label: t(`section.${id}`),
    to: localePath(`/#${id}`),
    exactHash: true,
    active: activeSection.value === id,
  })),
)
</script>

<template>
  <UHeader class="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white/75 dark:bg-gray-900/75 backdrop-blur">
    <template #title>
      <!-- TODO: customized logo -->
      <div class="font-bold text-xl flex items-center gap-2">
        <span class="text-primary-500">‹</span>
        Portfolio
        <span class="text-primary-500">/›</span>
      </div>
    </template>

    <UNavigationMenu
      :items="links"
      variant="link"
      class="hidden md:flex max-w-sm"
    />

    <template #right>
      <ClientOnly>
        <LocaleSelect />

        <UColorModeButton class="">
          <template #fallback>
            <UButton
              loading
              variant="ghost"
              color="neutral"
              square
            />
          </template>
        </UColorModeButton>
      </ClientOnly>
    </template>

    <template #body>
      <UNavigationMenu
        :items="links"
        variant="link"
        orientation="vertical"
      />

      <div class="mt-4 flex flex-col gap-4">
        <UButton
          trailing-icon="i-lucide-arrow-up-right"
          color="neutral"
          label="Github"
          to="/"
          target="_blank"
        />
      </div>
    </template>
  </UHeader>
</template>
