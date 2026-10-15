<script setup lang="ts">
const {
  linkClass = '',
  iconClass = 'size-6',
} = defineProps<{
  linkClass?: string
  iconClass?: string
}>()

const { t } = useI18n()
const { locale } = useI18n()

const otherLocale = computed(() => locale.value === 'en' ? 'zh' : 'en')
</script>

<template>
  <ClientOnly>
    <SwitchLocalePathLink
      :locale="otherLocale"
      :aria-label="t('header.languageSwitch')"
      :class="linkClass"
    >
      <slot>
        <Icon
          name="lucide:languages"
          :class="iconClass"
        />
      </slot>
    </SwitchLocalePathLink>

    <template #fallback>
      <div :class="linkClass">
        <Icon
          name="lucide:languages"
          :class="iconClass"
        />
      </div>
    </template>
  </ClientOnly>
</template>
