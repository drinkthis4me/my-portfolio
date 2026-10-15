<script setup lang="ts">
const { t } = useI18n()

function scrollToTop() {
  window.scrollTo(0, 0)
}
</script>

<template>
  <footer class="px-6 pb-8 lg:px-8">
    <div
      class="mx-auto pt-6 flex items-center justify-between max-w-7xl gap-6 border-t border-neutral-200"
    >
      <ClientOnly>
        <p class="text-xs">
          © {{ new Date().getFullYear() }} James Wang
        </p>

        <template #fallback>
          <p class="text-xs">
            © James Wang
          </p>
        </template>
      </ClientOnly>

      <button
        class="group inline-flex items-center gap-2 text-xs text-neutral-400 transition-colors hover:text-black"
        @click="scrollToTop"
      >
        {{ t('footer.backToTop') }}

        <Icon
          name="lucide:arrow-up"
          class="size-3 transition-transform duration-300 group-hover:-translate-y-1"
        />
      </button>
    </div>
  </footer>
</template>
