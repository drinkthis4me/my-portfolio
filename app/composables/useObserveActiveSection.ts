import type { SectionId } from './useActiveSection'

export const useObserveActiveSection = (ref: MaybeRefOrGetter, id: SectionId) => {
  const activeSection = useActiveSection()

  // Observe scrolling and set this component's id as activeSection
  const { stop } = useIntersectionObserver(
    ref,
    (entries) => {
      const isVisible = entries.find(e => e.isIntersecting)
      if (isVisible) {
        activeSection.value = id
      }
    },
    {
      rootMargin: '-40% 0px -40% 0px',
    },
  )

  // Cleanup observer
  onUnmounted(() => {
    stop()
  })
}
