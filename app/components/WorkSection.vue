<script setup lang="ts">
import { motion } from 'motion-v'
import { inViewOptions, revealTransition } from '~/utils/motion'

const { t, locale } = useI18n()

const workCollection = computed(() =>
  locale.value === 'en'
    ? 'work_en'
    : 'work_zh',
)

const { data: projects } = await useAsyncData(
  () => `featured-works-${locale.value}`,
  () => queryCollection(workCollection.value)
    .where('featured', '=', true)
    .select('slug', 'title', 'description', 'technologies', 'image')
    .all(),
  {
    watch: [workCollection],
  },
)
</script>

<template>
  <section
    id="work"
    class="px-6 py-24 lg:px-8 lg:py-40"
  >
    <div class="mx-auto max-w-7xl">
      <!-- Heading -->
      <div class="mb-16 grid gap-8 lg:grid-cols-12">
        <motion.div
          :initial="{ opacity: 0, y: 12 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="revealTransition"
          :in-view-options="inViewOptions"
          class="lg:col-span-3"
        >
          <p class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
            {{ t('work.label') }}
          </p>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{
            ...revealTransition,
            delay: 0.1,
          }"
          :in-view-options="inViewOptions"
          class="lg:col-span-7 lg:col-start-5"
        >
          <h2 class="text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            {{ t('work.title') }}
          </h2>
        </motion.div>
      </div>

      <!-- Projects -->
      <div class="grid gap-x-6 gap-y-16 lg:grid-cols-2 lg:gap-y-24">
        <motion.article
          v-for="(project, index) in projects"
          :key="project.slug"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{
            ...revealTransition,
            delay: (index % 2) * 0.12,
          }"
          :in-view-options="inViewOptions"
          class="group min-w-0"
        >
          <NuxtLinkLocale
            :to="{ name: 'work', params: { slug: project.slug } }"
            class="block"
          >
            <!-- Image -->
            <div class="aspect-4/3 overflow-hidden bg-neutral-100">
              <NuxtImg
                :src="project.image"
                :alt="project.title"
                width="1600"
                height="900"
                class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>

            <!-- Metadata -->
            <div class="mt-5">
              <div class="flex items-center gap-3">
                <h3 class="text-xl font-medium tracking-[-0.03em]">
                  {{ project.title }}
                </h3>

                <Icon
                  name="lucide:arrow-up-right"
                  class="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>

              <p class="mt-3 max-w-lg text-sm leading-6 text-neutral-600">
                {{ project.description }}
              </p>

              <ul class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
                <li
                  v-for="technology in project.technologies"
                  :key="technology"
                >
                  {{ technology }}
                </li>
              </ul>
            </div>
          </NuxtLinkLocale>
        </motion.article>
      </div>

      <!-- All work -->
      <motion.div
        :initial="{ opacity: 0, y: 12 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{
          ...revealTransition,
          delay: 0.1,
        }"
        :in-view-options="inViewOptions"
        class="mt-20 border-t border-neutral-200 pt-6"
      >
        <NuxtLinkLocale
          :to="{ name: 'all-works' }"
          class="group inline-flex items-center gap-3 text-sm font-medium"
        >
          <span>{{ t('work.viewAllWork') }}</span>

          <Icon
            name="lucide:arrow-up-right"
            class="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </NuxtLinkLocale>
      </motion.div>
    </div>
  </section>
</template>
