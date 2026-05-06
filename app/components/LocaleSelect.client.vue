<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locales, locale, setLocale } = useI18n()

const getFlagIcon = (code: string) => {
  switch (code) {
    case 'zh':
      return 'i-circle-flags-tw'
    case 'en':
      return 'i-circle-flags-us'
    default:
      return 'i-lucide-globe'
  }
}

const localeOptions = computed<DropdownMenuItem[]>(() =>
  locales.value.map(l => ({
    icon: getFlagIcon(l.code),
    label: l.name,
    code: l.code,
    class: l.code === locale.value ? 'text-primary-500 font-bold' : '',
    onSelect: () => setLocale(l.code),
  })),
)
</script>

<template>
  <UDropdownMenu
    :items="localeOptions"
  >
    <UButton
      icon="i-lucide-globe"
      color="neutral"
      variant="ghost"
      square
    />
  </UDropdownMenu>
</template>
