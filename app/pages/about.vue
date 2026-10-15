<script setup lang="ts">
import { motion } from 'motion-v'
import { revealTransition, inViewOptions } from '~/utils/motion'

definePageMeta({
  name: 'about',
})

const { t, locale } = useI18n()

const aboutCollection = computed(() =>
  locale.value === 'en'
    ? 'about_en'
    : 'about_zh',
)

const { data: about } = await useAsyncData(
  aboutCollection,
  () => queryCollection(aboutCollection.value).first(),
  {
    watch: [aboutCollection],
  },
)

const { ogImage } = useOgImage()

useSeoMeta({
  title: () => t('seo.about.title'),
  description: () => t('seo.about.description'),

  ogType: 'article',
  ogTitle: () => about.value?.title,
  ogDescription: () => about.value?.description,
  ogImage: () => ogImage.value,

  twitterCard: 'summary_large_image',
  twitterTitle: () => about.value?.title,
  twitterDescription: () => about.value?.description,
  twitterImage: () => ogImage.value,
})

if (!about.value) {
  throw createError({
    status: 404,
    message: 'About page not found',
  })
}
</script>

<template>
  <div>
    <!-- Intro -->
    <section class="px-6 pb-20 pt-40 lg:px-8 lg:pb-28 lg:pt-48">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <!-- Label -->
          <div class="lg:col-span-3">
            <p
              class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400"
            >
              {{ t('about.label') }}
            </p>
          </div>

          <!-- Photo + intro -->
          <div class="lg:col-span-8 lg:col-start-5">
            <div class="grid gap-10 sm:grid-cols-[340px_minmax(0,1fr)] sm:items-start">
              <motion.div
                :initial="{ opacity: 0, y: -12 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :transition="revealTransition"
                :in-view-options="inViewOptions"
                class="overflow-hidden"
              >
                <NuxtImg
                  src="/images/profile-picture-4x5.webp"
                  alt="Picture of James Wang with a dog"
                  width="1108"
                  height="1385"
                  placeholder
                  class="aspect-4/5 w-full object-cover"
                />
              </motion.div>

              <div>
                <h1
                  class="text-5xl font-medium leading-[0.95] tracking-tighter sm:text-6xl"
                >
                  James Wang
                </h1>

                <p
                  v-if="about.description"
                  class="mt-8 max-w-xl text-lg leading-8 text-neutral-500"
                >
                  {{ about.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="border-t border-neutral-200 px-6 py-16 lg:px-8 lg:py-20">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-8 lg:grid-cols-12">
          <div
            class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400 lg:col-span-3"
          >
            {{ t('about.moreAboutMe') }}
          </div>

          <article class="prose min-w-0 lg:col-span-8 lg:col-start-5">
            <ContentRenderer
              v-if="about"
              :value="about"
            />
            <p v-else>
              {{ t('error.500message') }}
            </p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
