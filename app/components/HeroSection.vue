<script setup lang="ts">
import { motion } from 'motion-v'
import { revealTransition } from '~/utils/motion'

const { t } = useI18n()
</script>

<template>
  <section
    id="hero"
    class="flex min-h-screen items-start px-6 pb-16 pt-32 lg:px-8 lg:pb-24"
  >
    <div class="mx-auto w-full max-w-7xl">
      <div class="max-w-5xl">
        <motion.p
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="revealTransition"
          class="mb-8 text-sm font-medium uppercase tracking-[0.16em]"
        >
          {{ t('hero.eyebrow') }}
        </motion.p>

        <motion.h1
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            ...revealTransition,
            delay: 0.08,
          }"
          class="max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-none tracking-tighter"
        >
          James
          <motion.span
            :initial="{ clipPath: 'inset(0 100% 0 0)' }"
            :animate="{ clipPath: 'inset(0 0% 0 0)' }"
            :transition="{
              duration: 0.8,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }"
            class="text-white bg-black"
          >
            Wang&nbsp;
          </motion.span>
        </motion.h1>

        <motion.div
          :initial="{ opacity: 0, y: 18 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            ...revealTransition,
            delay: 0.25,
          }"
          class="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p class="max-w-xl text-base leading-7 text-neutral-600">
            {{ t('hero.description') }}
          </p>

          <NuxtLinkLocale
            :to="{ hash: '#contact' }"
            class="group inline-flex w-fit items-center gap-3 text-sm font-medium"
          >
            <span>{{ t('hero.cta') }}</span>

            <Icon
              name="lucide:handshake"
              class="size-4 transition-transform duration-300 group-hover:-translate-y-1"
            />
          </NuxtLinkLocale>
        </motion.div>
      </div>

      <motion.div
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{
          ...revealTransition,
          delay: 0.4,
        }"
        class="mt-24 flex items-center justify-between border-t border-neutral-200 pt-4 text-xs uppercase tracking-[0.14em] text-neutral-400"
      >
        <span>{{ t('hero.footnote') }}</span>

        <motion.div
          :animate="{ y: [0, 5, 0] }"
          :transition="{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }"
          aria-hidden="true"
        >
          <Icon
            name="lucide:arrow-down"
            class="size-4"
          />
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>
