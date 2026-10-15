<script setup lang="ts">
definePageMeta({
  name: 'work',
})

const route = useRoute()
const { t, locale } = useI18n()

const slug = computed(() => {
  const slug = route.params.slug
  return Array.isArray(slug)
    ? slug.join('/')
    : String(slug)
})

const workCollection = computed(() =>
  locale.value === 'en'
    ? 'work_en'
    : 'work_zh',
)

const projectQueryKey = computed(() => `work-${locale.value}-${slug.value}`)

const { data: project } = await useAsyncData(
  projectQueryKey,
  async () => {
    const content = await queryCollection(workCollection.value)
      .path(`/work/${slug.value}`)
      .first()

    if (!content && locale.value !== 'zh') {
      return await queryCollection('work_zh').path(slug.value).first()
    }

    return content
  },
  {
    watch: [projectQueryKey],
  },
)

const { ogImage } = useOgImage(() => project.value?.image)

useSeoMeta({
  title: () => project.value?.title,
  description: () => project.value?.description,

  ogType: 'article',
  ogTitle: () => project.value?.title,
  ogDescription: () => project.value?.description,
  ogImage: () => ogImage.value,

  twitterCard: 'summary_large_image',
  twitterTitle: () => project.value?.title,
  twitterDescription: () => project.value?.description,
  twitterImage: () => ogImage.value,
})

if (!project.value) {
  throw createError({
    status: 404,
    message: t('error.404message'),
  })
}
</script>

<template>
  <div v-if="project">
    <!-- Project header -->
    <section class="px-6 pb-16 pt-40 lg:px-8 lg:pb-24 lg:pt-48">
      <div class="mx-auto max-w-7xl">
        <NuxtLinkLocale
          :to="{ name: 'all-works' }"
          class="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-black"
        >
          <Icon
            name="lucide:arrow-left"
            class="size-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>{{ t('work.allWork') }}</span>
        </NuxtLinkLocale>

        <div class="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-9">
            <p
              class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400"
            >
              {{ t('work.caseStudy') }}
            </p>

            <h1
              class="mt-6 max-w-5xl text-5xl font-medium leading-[0.95] tracking-tighter sm:text-6xl lg:text-8xl"
            >
              {{ project.title }}
            </h1>

            <p
              v-if="project.description"
              class="mt-8 max-w-2xl text-lg leading-8 text-neutral-500"
            >
              {{ project.description }}
            </p>
          </div>

          <!-- Technologies -->
          <aside class="flex flex-col justify-center space-y-4 lg:col-span-3 lg:pt-1">
            <p
              class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400"
            >
              {{ t('work.technologies') }}
            </p>

            <ul class="flex flex-wrap gap-x-3 gap-y-2">
              <li
                v-for="technology in project.technologies"
                :key="technology"
                class="text-sm text-neutral-600"
              >
                {{ technology }}
              </li>
            </ul>

            <NuxtLink
              :href="project.githubLink"
              class="space-x-1"
            >
              <Icon
                name="lucide:github"
                class="size-4"
              />
              <span>Github repo</span>
            </NuxtLink>
          </aside>
        </div>
      </div>
    </section>

    <!-- Cover image -->
    <section
      v-if="project.image"
      class="px-6 lg:px-8"
    >
      <div class="aspect-video mx-auto max-w-7xl">
        <NuxtImg
          :src="project.image"
          :alt="project.title"
          width="1600"
          height="900"
          class="w-full bg-neutral-100 object-cover"
        />
      </div>
    </section>

    <!-- Markdown content -->
    <section class="px-6 py-20 lg:px-8 lg:py-28">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-8 lg:grid-cols-12">
          <p
            class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400 lg:col-span-3"
          >
            {{ t('work.projectDetails') }}
          </p>

          <article class="prose min-w-0 lg:col-span-8 lg:col-start-5">
            <p>{{ project.publishedAt }}</p>

            <ContentRenderer
              :value="project"
            />
          </article>
        </div>
      </div>
    </section>

    <!-- Back to all-works -->
    <section class="border-t border-neutral-200 px-6 py-12 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <NuxtLinkLocale
          :to="{ name: 'all-works' }"
          class="group inline-flex items-center gap-3 text-sm font-medium"
        >
          <Icon
            name="lucide:arrow-left"
            class="size-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>
            {{ t('work.exploreMoreWork') }}
          </span>
        </NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>
