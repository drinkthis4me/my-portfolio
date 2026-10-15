export default function (path?: MaybeRefOrGetter<string | undefined>) {
  const config = useRuntimeConfig()

  /**
   * Absolute url for og image.
   */
  const ogImage = computed(() => {
    const customPath = toValue(path)
    const imgPath = customPath || '/og-image.png'

    return new URL(imgPath, config.public.siteUrl).href
  })

  return {
    ogImage,
  }
}
