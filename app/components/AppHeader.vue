<script setup lang="ts">
const currentSection = ref<string>()

const links = computed(() => [
  {
    label: 'About',
    to: '#about',
    exactHash: true,
    active: currentSection.value === 'about',
  },
  {
    label: 'Experience',
    to: '#experience',
    exactHash: true,
    active: currentSection.value === 'experience',
  },
  {
    label: 'Skills',
    to: '#skills',
    exactHash: true,
    active: currentSection.value === 'skills',
  },
  {
    label: 'Contact Me',
    to: '#contact',
    exactHash: true,
    active: currentSection.value === 'contact',
  },
])
</script>

<template>
  <UHeader class="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white/75 dark:bg-gray-900/75 backdrop-blur">
    <template #title>
      <NuxtLink
        to="/"
        class="font-bold text-xl flex items-center gap-2"
      >
        <span class="text-primary-500">‹</span>
        Portfolio
        <span class="text-primary-500">/›</span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="links"
      variant="link"
      class="hidden md:flex max-w-sm"
    />

    <template #right>
      <UColorModeButton class="hidden lg:flex">
        <template #fallback>
          <UButton
            loading
            variant="ghost"
            color="neutral"
            class="rounded-full"
          />
        </template>
      </UColorModeButton>

      <UButton
        trailing-icon="i-heroicons-arrow-top-right-on-square"
        color="neutral"
        label="Github"
        to="/"
        target="_blank"
        class="hidden lg:flex"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="links"
        variant="link"
        orientation="vertical"
      />

      <div class="mt-4 flex flex-col gap-4">
        <UButton
          trailing-icon="i-heroicons-arrow-top-right-on-square"
          color="neutral"
          label="Github"
          to="/"
          target="_blank"
          class="hidden md:flex"
        />
      </div>
    </template>
  </UHeader>
</template>
