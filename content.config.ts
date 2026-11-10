import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        category: z.string(),
        // Filled in from git history by the `content:file:afterParse` hook in nuxt.config.ts
        createdAt: z.string(),
        updatedAt: z.string(),
        // Filled in by remark-reading-time
        readingTime: z.object({
          text: z.string(),
          minutes: z.number(),
          time: z.number(),
          words: z.number()
        })
      })
    }),
    friends: defineCollection({
      type: 'data',
      source: 'friends.yaml',
      schema: z.object({
        body: z.array(z.object({
          name: z.string(),
          url: z.string(),
          description: z.string().optional(),
          avatar: z.string().optional()
        }))
      })
    })
  }
})
