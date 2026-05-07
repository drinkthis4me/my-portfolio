<script setup lang="ts">
// Composable from '@vueuse/nuxt'
const { y } = useWindowScroll()

// Show button when user has scrolled down 300px
const isVisible = computed(() => y.value > 300)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-10 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-10 opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-18 right-10 z-50"
    >
      <UButton
        icon="i-lucide-arrow-up"
        size="xl"
        color="primary"
        square
        class="rounded-full hover:scale-110 transition-all active:scale-95"
        @click="scrollToTop"
      />
    </div>
  </Transition>
</template>
