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
          description: z.string(),
          image: z.object({
            src: z.string(),
            alt: z.string(),
          }),
        }),

        experience: z.object({
          title: z.string(),
          items: z.array(z.object({
            position: z.string(),
            company: z.object({
              name: z.string(),
              url: z.string(),
            }),
            date: z.string(),
            description: z.string(),
            detail: z.string().optional(),
          })),
        }),

        skills: z.object({
          title: z.string(),
          category: z.array(z.object({
            name: z.string(),
            description: z.string().optional(),
            items: z.array(z.object({
              name: z.string(),
              icon: z.string(),
            })),
          })),
        }),

        contact: z.object({
          title: z.string(),
          headline: z.string(),
          subheadline: z.string(),
          email: z.string(),
          socials: z.array(z.object({
            name: z.string(),
            icon: z.string(),
            url: z.string(),
          })),
        }),
      }),
    }),
  },
})
