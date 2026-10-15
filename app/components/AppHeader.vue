<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'

const isMenuOpen = ref(false)

const { t } = useI18n()

const navItems = computed(() => [
  { label: t('header.about'), routeName: 'about', hash: '' },
  { label: t('header.expertise'), routeName: 'index', hash: '#expertise' },
  { label: t('header.work'), routeName: 'all-works', hash: '' },
  { label: t('header.contact'), routeName: 'index', hash: '#contact' },
])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

// Disable scrolling when mobile nav opened
watch(isMenuOpen, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

// Restore scrolling if the component unmounts while the menu is open.
onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <div class="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
      <!-- Logo -->
      <NuxtLinkLocale
        to="index"
        class="p-0.5 text-xl font-serif font-semibold tracking-tight bg-white"
        :aria-label="t('header.home')"
        @click="closeMenu"
      >
        James Wang
      </NuxtLinkLocale>

      <!-- Desktop navigation -->
      <nav
        class="hidden sm:block"
        aria-label="Main navigation"
      >
        <ul class="flex items-center gap-6">
          <li
            v-for="item in navItems"
            :key="item.label"
          >
            <NuxtLinkLocale
              :to="{ name: item.routeName, hash: item.hash }"
              :aria-label="item.label"
              class="group relative p-0.5 text-base text-neutral-600 transition-colors duration-300 hover:text-black bg-white"
            >
              {{ item.label }}

              <span
                class="absolute -bottom-1 left-0 h-1 w-full origin-right scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
              />
            </NuxtLinkLocale>
          </li>
          <li>
            <UiLocaleToggler
              link-class="p-0.5  bg-white flex items-center justify-center"
            />
          </li>
        </ul>
      </nav>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="flex size-12 items-center justify-center sm:hidden bg-white"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-navigation"
        aria-label="Toggle navigation"
        @click="toggleMenu"
      >
        <AnimatePresence
          mode="wait"
          :initial="false"
        >
          <motion.div
            :key="isMenuOpen ? 'close' : 'menu'"
            :initial="{ opacity: 0, y: 10 * (isMenuOpen ? -1 : 1), scale: 0.8 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :exit="{ opacity: 0, y: 10 * (isMenuOpen ? -1 : 1), scale: 0.8 }"
            :transition="{ duration: 0.18, ease: 'easeOut' }"
            class="flex items-center justify-center"
          >
            <Icon
              :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'"
              class="size-8"
            />
          </motion.div>
        </AnimatePresence>
      </button>
    </div>

    <!-- Mobile navigation -->
    <AnimatePresence>
      <motion.nav
        v-if="isMenuOpen"
        id="mobile-navigation"
        :initial="{ opacity: 0, y: -12 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -8 }"
        :transition="{ duration: 0.15, ease: 'easeOut' }"
        class="fixed inset-0 z-10 pt-24 overflow-y-auto border-t border-neutral-200 bg-white h-dvh sm:hidden"
        aria-label="Mobile navigation"
      >
        <ul class="px-6 py-4 space-y-6">
          <li
            v-for="item in navItems"
            :key="item.label"
          >
            <NuxtLinkLocale
              :to="{ name: item.routeName, hash: item.hash }"
              :aria-label="item.label"
              class="block text-4xl"
              @click="closeMenu"
            >
              {{ item.label }}
            </NuxtLinkLocale>
          </li>
          <li>
            <UiLocaleToggler
              link-class="flex items-center"
              icon-class="size-12"
              @click="toggleMenu"
            />
          </li>
        </ul>
      </motion.nav>
    </AnimatePresence>
  </header>
</template>
