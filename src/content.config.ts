import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z.object({
    title: z.string(), description: z.string(), category: z.string(),
    createdAt: z.iso.datetime({ offset: true }).optional(),
    updatedAt: z.iso.datetime({ offset: true }).optional()
  })
})
export const collections = { posts }
