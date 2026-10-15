<script setup lang="ts">
import { motion } from 'motion-v'
import { revealTransition, inViewOptions } from '~/utils/motion'

const { t } = useI18n()

const config = useAppConfig()

const email = computed(() => config.email ?? '')

const links = computed(() => [
  {
    label: 'LinkedIn',
    href: config.linkedIn ?? '#',
    icon: 'lucide:linkedin',
  },
  {
    label: 'GitHub',
    href: config.github ?? '#',
    icon: 'lucide:github',
  },
])
</script>

<template>
  <section
    id="contact"
    class="px-6 py-24 lg:px-8 lg:py-40"
  >
    <div class="mx-auto max-w-7xl">
      <div class="border-t border-neutral-200 pt-8">
        <motion.p
          :initial="{ opacity: 0, y: 12 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="revealTransition"
          :in-view-options="inViewOptions"
          class="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400"
        >
          {{ t('contact.label') }}
        </motion.p>

        <motion.div
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{
            ...revealTransition,
            delay: 0.1,
          }"
          :in-view-options="inViewOptions"
          class="mt-16 max-w-5xl"
        >
          <i18n-t
            keypath="contact.title1"
            tag="h2"
            for="contact.title2"
            class="text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.9] tracking-[-0.06em]"
          >
            <span class="text-neutral-400">{{ t('contact.title2') }}</span>
          </i18n-t>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{
            ...revealTransition,
            delay: 0.25,
          }"
          :in-view-options="inViewOptions"
          class="mt-16 flex flex-col gap-8 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <a
            :href="`mailto:${email}`"
            class="group inline-flex items-center gap-3 text-base font-medium"
          >
            <span>{{ email }}</span>

            <Icon
              name="lucide:mail"
              class="size-4 transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>

          <nav aria-label="Social links">
            <ul class="flex items-center gap-6">
              <li
                v-for="link in links"
                :key="link.label"
              >
                <NuxtLink
                  :href="link.href"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-300 hover:text-black"
                >
                  <Icon
                    :name="link.icon"
                    class="size-4"
                  />

                  <span>{{ link.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </motion.div>
      </div>
    </div>
  </section>
</template>
