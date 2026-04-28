<template>
  <UFooter
    :ui="{
      container: 'border-t border-default lg:py-8',
    }"
  >
    <template #left>
      <p class="text-sm">
        © {{ new Date().getFullYear() }} James Wang. All rights reserved.
      </p>
    </template>

    <template #right>
      <div class="flex items-center gap-1">
        <span>Built with</span>
        <UIcon
          name="i-logos-nuxt-icon"
          class="w-4 h-4"
        />
        <span class="font-semibold text-gray-600 dark:text-gray-300">Nuxt UI</span>
      </div>
    </template>
  </UFooter>
</template>
