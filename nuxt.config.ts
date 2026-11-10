import { simpleGit } from 'simple-git'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo'
  ],
  vue: {
    compilerOptions: {
      // Workaround to suppress warnings on custom elements
      // Ref: https://github.com/nuxt/content/issues/949
      // Ref: https://github.com/nuxt/content/issues/1774
      isCustomElement: (tag) => {
        const tags = [
          'math',
          'annotation',
          'semantics',
          'mtext',
          'mn',
          'mo',
          'mi',
          'mspace',
          'mover',
          'munder',
          'munderover',
          'msup',
          'msub',
          'msubsup',
          'mfrac',
          'mroot',
          'msqrt',
          'mtable',
          'mtr',
          'mtd',
          'mlabeledtr',
          'mrow',
          'menclose',
          'mstyle',
          'mpadded',
          'mphantom',
          'mglyph',
          'svg',
          'line',
          'path']
        return tags.includes(tag.toLowerCase())
      }
    }
  },
  site: {
    url: 'https://blog.kiyo5hi.com',
    name: 'Kiyoshi\'s Blog',
    description: 'Kiyoshi\'s Blog - sharing knowledge in ' +
      'programming and all sort of things related to computer science.',
    defaultLocale: 'en-US'
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'light-plus',
            dark: 'dark-plus'
          },
          // Only bundled languages can be highlighted, so keep Content's defaults
          // next to the languages the posts use
          langs: [
            'c',
            'cpp',
            'java',
            'python',
            'vue',
            'vue-html',
            'ini',
            'shell',
            'bash',
            'js',
            'jsx',
            'ts',
            'tsx',
            'json',
            'yaml',
            'css',
            'html',
            'md',
            'mdc'
          ]
        },
        remarkPlugins: {
          'remark-math': {},
          'remark-reading-time': {}
        },
        rehypePlugins: {
          'rehype-katex': {}
        }
      }
    },
    experimental: {
      // Node.js >= 22.5 ships `node:sqlite`, so no native better-sqlite3 build is needed
      sqliteConnector: 'native'
    }
  },
  colorMode: {
    classSuffix: ''
  },
  postcss: {
    plugins: {
      // Nuxt 4 loads PostCSS plugins as ES modules, which Tailwind CSS 3's
      // `tailwindcss/nesting` entry does not support. No stylesheet uses nesting.
      'tailwindcss/nesting': false
    }
  },
  eslint: {
    config: {
      // Keep the standard-like style of @nuxtjs/eslint-config-typescript
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  ogImage: {
    enabled: false
  },
  aiReady: {
    enabled: false
  },
  skewProtection: {
    enabled: false
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/'
      ]
    }
  },
  runtimeConfig: {
    public: {
      profile: {
        name: 'Kiyoshi',
        avatar: 'https://avatars.githubusercontent.com/u/44930252?v=4'
      },
      giscus: {
        username: 'Kiyo5hi',
        repoName: 'blog-resources',
        repoId: 'R_kgDOI0u2OA',
        category: 'General',
        catetoryId: 'DIC_kwDOI0u2OM4CTv99'
      }
    }
  },
  hooks: {
    // Derive post dates from git history, so the CD checkout must keep full history
    async 'content:file:afterParse' ({ file, content, collection }) {
      if (collection.name !== 'posts') {
        return
      }

      const log = await simpleGit().log({ file: file.path })

      content.createdAt = log.all.at(-1)?.date || new Date().toISOString()
      content.updatedAt = log.latest?.date || new Date().toISOString()
    }
  },
  compatibilityDate: '2026-11-10'
})
