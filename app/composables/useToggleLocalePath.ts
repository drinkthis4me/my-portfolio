/**
 * Toggle between 'zh' and 'en'
 */
export default function () {
  const switchLocalePath = useSwitchLocalePath()
  const { locale } = useI18n()

  const otherLocale = computed(() => locale.value === 'en' ? 'zh' : 'en')

  const otherLocalePath = computed(() => switchLocalePath(otherLocale.value))

  return {
    otherLocale,
    otherLocalePath,
  }
}
