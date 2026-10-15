<script setup lang="ts">
import { motion } from 'motion-v'
import { revealTransition, inViewOptions } from '~/utils/motion'

const { t } = useI18n()

const expertiseItems = computed(() => [
  {
    number: '01',
    title: t('expertise.items.01.title'),
    description: t('expertise.items.01.description'),
    technologies: 'Vue · Nuxtjs · React · Nextjs · TypeScript',
  },
  {
    number: '02',
    title: t('expertise.items.02.title'),
    description: t('expertise.items.02.description'),
    technologies: 'Tailwind CSS · Design Systems · Component Architecture',
  },
  {
    number: '03',
    title: t('expertise.items.03.title'),
    description: t('expertise.items.03.description'),
    technologies: 'Data Fetching · State Management · Authentication · Docker · SQL/No-SQL Database',
  },
  {
    number: '04',
    title: t('expertise.items.04.title'),
    description: t('expertise.items.04.description'),
    technologies: 'Vitest · Playwright · Type Safety · Performance',
  },
])
</script>

<template>
  <section
    id="expertise"
    class="px-6 py-24 lg:px-8 lg:py-40"
  >
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <!-- Section heading -->
        <motion.div
          :initial="{ opacity: 0, y: 12 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="revealTransition"
          :in-view-options="inViewOptions"
          class="lg:col-span-3"
        >
          <p class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
            {{ t('expertise.label') }}
          </p>
        </motion.div>

        <!-- Expertise list -->
        <div class="lg:col-span-9">
          <div class="border-t border-neutral-200">
            <motion.article
              v-for="(item, index) in expertiseItems"
              :key="item.number"
              :initial="{ opacity: 0, y: 20 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :transition="{
                ...revealTransition,
                delay: index * 0.1,
              }"
              :in-view-options="inViewOptions"
              class="group grid gap-6 border-b border-neutral-200 py-8 sm:grid-cols-[48px_1fr] lg:grid-cols-[56px_1fr_220px]"
            >
              <span class="text-xs text-neutral-400">
                {{ item.number }}
              </span>

              <div>
                <h3
                  class="text-2xl font-medium tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl"
                >
                  {{ item.title }}
                </h3>

                <p class="mt-4 max-w-xl text-sm leading-6">
                  {{ item.description }}
                </p>
              </div>

              <p class="-col-end-1 text-xs leading-5 text-neutral-400 lg:pt-1">
                {{ item.technologies }}
              </p>
            </motion.article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
