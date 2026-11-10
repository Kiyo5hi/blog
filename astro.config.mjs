import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { remarkReadingTime } from './src/lib/reading-time.mjs'
import { rehypeLegacyAnchors } from './src/lib/legacy-anchors.mjs'

export default defineConfig({
  site: 'https://blog.kiyo5hi.com',
  output: 'static',
  trailingSlash: 'never',
  // Keep extensionless URLs and the exact pathname Giscus uses for discussions.
  build: { format: 'file' },
  compressHTML: true,
  markdown: {
    processor: unified({
      smartypants: false,
      remarkPlugins: [remarkMath, remarkReadingTime],
      rehypePlugins: [rehypeKatex, rehypeLegacyAnchors]
    }),
    shikiConfig: {
      themes: { light: 'light-plus', dark: 'dark-plus' },
      transformers: [{
        pre(node) { node.properties['data-language'] = this.options.lang }
      }]
    }
  }
})
