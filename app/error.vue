<script setup lang="ts">
import type { NuxtError } from '#app'
import type { Locale } from 'vue-i18n'

const props = defineProps<{
  error: NuxtError
}>()

const { t, locale, loadLocaleMessages } = useI18n()

const statusCode = computed(() => props.error.status || 500)
const errorKeys = computed(() => {
  if (statusCode.value === 404) {
    return {
      title: 'error.404title',
      description: 'error.404message',
    }
  }

  return {
    title: 'error.500title',
    description: 'error.500message',
  }
})

const currentLocale = ref<Locale>(locale.value)
const isSwitchingLocale = ref(false)

async function switchLocale() {
  if (isSwitchingLocale.value) return

  isSwitchingLocale.value = true

  const nextLocale: Locale
    = currentLocale.value === 'zh' ? 'en' : 'zh'

  await loadLocaleMessages(nextLocale)
  currentLocale.value = nextLocale

  isSwitchingLocale.value = false
}
</script>

<template>
  <main
    class="flex min-h-screen flex-col justify-between px-6 py-8 lg:px-12 lg:py-10"
  >
    <header class="flex items-center justify-between">
      <NuxtLinkLocale
        :to="{ name: 'index' }"
        class="text-xl font-serif font-semibold tracking-tight bg-white"
      >
        James Wang
      </NuxtLinkLocale>

      <button
        aria-label="Switch language"
        :disabled="isSwitchingLocale"
        :aria-buzy="isSwitchingLocale"
        @click="switchLocale"
      >
        <Icon
          name="lucide:languages"
          class="size-6"
        />
      </button>
    </header>

    <section class="mx-auto w-full max-w-3xl py-24">
      <p class="mb-6 text-sm font-medium uppercase tracking-[0.16em] text-neutral-400">
        Error {{ statusCode }}
      </p>

      <h1 class="text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
        {{ t(errorKeys.title, {}, { locale: currentLocale }) }}
      </h1>

      <p class="mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg">
        {{ t(errorKeys.description, {}, { locale: currentLocale }) }}
      </p>

      <div class="mt-10">
        <NuxtLinkLocale
          :to="{ name: 'index' }"
        >
          <div class="inline-flex items-center gap-3 border border-black px-5 py-3 text-sm font-medium transition-colors duration-200 hover:bg-black hover:text-white">
            {{ t('error.backToHome', {}, { locale: currentLocale }) }}
            <span aria-hidden="true">↗</span>
          </div>
        </NuxtLinkLocale>
      </div>
    </section>

    <footer class="border-t border-neutral-200 pt-5">
      <ClientOnly>
        <p class="text-xs text-neutral-400">
          © {{ new Date().getFullYear() }} · James Wang · {{ t('error.footer', {}, { locale: currentLocale }) }}
        </p>
      </ClientOnly>
    </footer>
  </main>
</template>
