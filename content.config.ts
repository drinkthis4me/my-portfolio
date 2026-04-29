import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yaml',
      schema: z.object({
        seo: z.object({
          title: z.string(),
          description: z.string(),
        }),
        hero: z.object({
          title: z.string(),
          headline: z.string().optional(),
          subheadline: z.string().optional(),
          cta_primary: z.string().optional(),
          logos: z.object({
            title: z.string().nonempty(),
            items: z.array(z.string()),
          }),
        }),

        about: z.object({
          title: z.string(),
          poster_line_1: z.string().optional(),
          poster_line_2: z.string().optional(),
          poster_line_3: z.string().optional(),
        }),
      }),
    }),
  },
})
