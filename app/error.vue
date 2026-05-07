<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const errorConfig = computed(() => {
  const nuxtErrorStatus = props.error?.status ?? 500
  const statusMessage = nuxtErrorStatus === 404 ? t('error.404title') : t('error.500title')
  const message = nuxtErrorStatus === 404 ? t('error.404message') : t('error.500message')

  return {
    statusCode: nuxtErrorStatus,
    statusMessage,
    message,
  }
})

// Function to clear the error and redirect home
const handleError = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <UError
    :error="errorConfig"
  >
    <template #links>
      <UButton
        :label="t('error.backHome')"
        color="neutral"
        size="xl"
        icon="i-lucide-arrow-left"
        class="rounded-full"
        @click="handleError"
      />
    </template>
  </UError>
</template>
