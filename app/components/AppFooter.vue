<script setup lang="ts">
const { t } = useI18n()
const appConfig = useAppConfig()
</script>

<template>
  <UFooter
    :ui="{
      container: 'border-t border-default lg:py-8',
    }"
  >
    <template #left>
      <ClientOnly>
        <p class="text-sm">
          © {{ new Date().getFullYear() }} {{ t('footer.copyright') }}
        </p>
      </ClientOnly>
    </template>

    <template #right>
      <div class="flex items-center gap-4">
        <div class="flex flex-wrap items-center gap-1">
          <span>Built with</span>
          <div class="flex items-center gap-1">
            <UIcon
              name="i-logos-nuxt-icon"
              class="w-4 h-4"
            />
            <span class="font-semibold text-gray-600 dark:text-gray-300">Nuxt UI</span>
          </div>
        </div>

        <UButton
          color="neutral"
          leading-icon="i-logos-github-icon"
          :to="appConfig.sourceCodeLink"
          target="_blank"
          :ui="{
            leadingIcon: 'rounded-full bg-white',
          }"
        >
          {{ t('footer.viewSourceCode') }}
        </UButton>
      </div>
    </template>
  </UFooter>
</template>
