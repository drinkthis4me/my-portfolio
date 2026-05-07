<script setup lang="ts">
const target = useTemplateRef('revealTarget')
const isVisible = ref(false)

useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true
    }
  },
  {
    // Triggers when 15% of the section is visible
    threshold: 0.15,
  },
)
</script>

<template>
  <div
    ref="revealTarget"
    :class="[
      'transition-all duration-1000 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-15',
    ]"
  >
    <slot />
  </div>
</template>
