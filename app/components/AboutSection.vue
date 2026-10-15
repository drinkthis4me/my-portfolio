<script setup lang="ts">
import { motion } from 'motion-v'
import {
  inViewOptions,
  revealFromBottom,
  revealTransition,
} from '~/utils/motion'

const { t } = useI18n()
</script>

<template>
  <section
    id="about"
    class="px-6 py-24 lg:px-8 lg:py-40"
  >
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-8">
      <!-- Section label -->
      <motion.div
        :initial="{ opacity: 0, y: 12 }"
        :while-in-view="revealFromBottom.visible"
        :transition="revealTransition"
        :in-view-options="inViewOptions"
        class="lg:col-span-3"
      >
        <p class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
          {{ t('about.label') }}
        </p>
      </motion.div>

      <!-- Main content -->
      <div class="lg:col-span-8 lg:col-start-5">
        <motion.h2
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="revealFromBottom.visible"
          :transition="{
            ...revealTransition,
            delay: 0.08,
          }"
          :in-view-options="inViewOptions"
          class="text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl"
        >
          {{ t('about.title') }}
        </motion.h2>

        <motion.p
          :initial="{ opacity: 0, y: 16 }"
          :while-in-view="revealFromBottom.visible"
          :transition="{
            ...revealTransition,
            delay: 0.16,
          }"
          :in-view-options="inViewOptions"
          class="mt-10 max-w-xl text-base leading-7 text-neutral-600"
        >
          {{ t('about.description') }}
        </motion.p>

        <motion.div
          :initial="{ opacity: 0, y: 12 }"
          :while-in-view="revealFromBottom.visible"
          :transition="{
            ...revealTransition,
            delay: 0.24,
          }"
          :in-view-options="inViewOptions"
        >
          <NuxtLinkLocale
            :to="{ name: 'about' }"
            class="group mt-10 inline-flex items-center gap-3 text-sm font-medium"
          >
            <span>{{ t('about.moreAboutMe') }}</span>

            <Icon
              name="lucide:arrow-up-right"
              class="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </NuxtLinkLocale>
        </motion.div>
      </div>
    </div>
  </section>
</template>
