import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const aboutSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const workSchema = z.object({
  slug: z.string(),
  publishedAt: z.string(), // YYYY-MM-DD
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  image: z.string(),
  githubLink: z.string(),
  featured: z.boolean().default(false),
})

export default defineContentConfig({
  collections: {
    about_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/about/*.md',
        prefix: '/',
      },
      schema: aboutSchema,
    }),

    about_zh: defineCollection({
      type: 'page',
      source: {
        include: 'zh/about/*.md',
        prefix: '/',
      },
      schema: aboutSchema,
    }),

    work_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/work/*.md',
        prefix: '/work',
      },
      schema: workSchema,
    }),

    work_zh: defineCollection({
      type: 'page',
      source: {
        include: 'zh/work/*.md',
        prefix: '/work',
      },
      schema: workSchema,
    }),
  },
})
