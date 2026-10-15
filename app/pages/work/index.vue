<script setup lang="ts">
definePageMeta({
  name: 'all-works',
})

const { t, locale } = useI18n()

const workCollection = computed(() =>
  locale.value === 'en'
    ? 'work_en'
    : 'work_zh',
)

const { data: projects } = await useAsyncData(
  workCollection,
  () => queryCollection(workCollection.value)
    .select('publishedAt', 'slug', 'title', 'description', 'technologies', 'image')
    .order('publishedAt', 'DESC')
    .all(),
  {
    watch: [workCollection],
  },
)

const { ogImage } = useOgImage()

useSeoMeta({
  title: () => t('seo.works.title'),
  description: () => t('seo.works.description'),

  ogTitle: () => t('seo.works.title'),
  ogDescription: () => t('seo.works.description'),
  ogImage: () => ogImage.value,

  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.works.title'),
  twitterDescription: () => t('seo.works.description'),
  twitterImage: () => ogImage.value,
})
</script>

<template>
  <div>
    <!-- Page intro -->
    <section class="px-6 pb-20 pt-40 lg:px-8 lg:pb-28 lg:pt-48">
      <div class="mx-auto max-w-7xl">
        <p
          class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400"
        >
          {{ t('allWorks.eyebrow') }}
        </p>

        <div class="mt-8 grid gap-8 lg:grid-cols-12">
          <h1
            class="text-5xl font-medium leading-[0.95] tracking-tighter sm:text-6xl lg:col-span-9 lg:text-8xl"
          >
            {{ t('allWorks.title') }}
          </h1>

          <p
            class="max-w-md text-base leading-7 text-neutral-500 lg:col-span-4 lg:col-start-9"
          >
            {{ t('allWorks.description') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Project grid -->
    <section class="border-t border-neutral-200 px-6 py-16 lg:px-8 lg:py-20">
      <div class="mx-auto max-w-7xl">
        <div
          v-if="projects?.length"
          class="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:gap-y-24"
        >
          <article
            v-for="(project, index) in projects"
            :key="project.slug"
            class="group"
          >
            <!-- Project image -->
            <NuxtLinkLocale
              :to="{ name: 'work', params: { slug: project.slug } }"
              class="block overflow-hidden bg-neutral-100"
              :aria-label="`${t('allWorks.viewProject')}: ${project.title}`"
            >
              <div
                v-if="project.image"
                class="aspect-4/3 overflown-hidden"
              >
                <NuxtImg
                  :src="project.image"
                  :alt="project.title"
                  width="1600"
                  height="900"
                  sizes="sm:50vw lg:600px"
                  loading="lazy"
                  class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div
                v-else
                class="flex aspect-4/3 items-center justify-center bg-neutral-100 text-sm text-neutral-400"
              >
                {{ t('allWorks.projectLabel') }} {{ String(index + 1).padStart(2, '0') }}
              </div>
            </NuxtLinkLocale>

            <!-- Project details -->
            <div class="mt-5 flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.14em] text-neutral-400">
                  {{ t('allWorks.projectLabel') }}
                  {{ String(index + 1).padStart(2, '0') }}
                </p>

                <h2 class="mt-2 text-xl font-medium tracking-tight">
                  <NuxtLinkLocale
                    :to="{ name: 'work', params: { slug: project.slug } }"
                    class="transition-colors duration-300 hover:text-neutral-500"
                  >
                    {{ project.title }}
                  </NuxtLinkLocale>
                </h2>
              </div>

              <NuxtLinkLocale
                :to="{ name: 'work', params: { slug: project.slug } }"
                :aria-label="`${t('allWorks.viewProject')}: ${project.title}`"
                class="mt-1 shrink-0"
              >
                <Icon
                  name="lucide:arrow-up-right"
                  class="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </NuxtLinkLocale>
            </div>

            <p
              v-if="project.description"
              class="mt-3 max-w-lg text-sm leading-6 text-neutral-500"
            >
              {{ project.description }}
            </p>

            <ul
              v-if="project.technologies?.length"
              class="mt-4 flex flex-wrap gap-x-3 gap-y-2"
              :aria-label="`${project.title} technologies`"
            >
              <li
                v-for="technology in project.technologies"
                :key="technology"
                class="text-xs text-neutral-400"
              >
                {{ technology }}
              </li>
            </ul>
          </article>
        </div>

        <p
          v-else
          class="border-t border-neutral-200 py-12 text-sm text-neutral-500"
        >
          {{ t('allWorks.empty') }}
        </p>
      </div>
    </section>
  </div>
</template>
