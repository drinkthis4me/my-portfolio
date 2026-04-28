<script setup lang="ts">
const activeSection = ref<string>()

// Define the section IDs we want to watch
const sectionIds = ['about', 'experience', 'skills', 'contact']

// Observe/update active section when scrolling
onMounted(() => {
  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (!el) return

    useIntersectionObserver(
      el,
      (entries) => {
        const visible = entries.find(e => e.isIntersecting)
        if (visible) {
          activeSection.value = id
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      },
    )
  })
})

// Links for <UNavigationMenu>
const links = computed(() => [
  {
    label: 'About',
    to: '#about',
    exactHash: true,
    active: activeSection.value === 'about',
  },
  {
    label: 'Experience',
    to: '#experience',
    exactHash: true,
    active: activeSection.value === 'experience',
  },
  {
    label: 'Skills',
    to: '#skills',
    exactHash: true,
    active: activeSection.value === 'skills',
  },
  {
    label: 'Contact Me',
    to: '#contact',
    exactHash: true,
    active: activeSection.value === 'contact',
  },
])
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
      <UColorModeButton class="">
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
        trailing-icon="i-lucide-arrow-up-right"
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
