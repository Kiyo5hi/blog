// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  extends: [
    'nuxt-seo-kit'
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
  content: {
    highlight: {
      theme: {
        default: 'light-plus',
        dark: 'dark-plus'
      },
      preload: [
        'c',
        'cpp',
        'java',
        'python',
        'vue',
        'vue-html',
        'ini'
      ]
    },
    markdown: {
      remarkPlugins: ['remark-math', 'remark-reading-time'],
      rehypePlugins: ['rehype-katex']
    }
  },
  colorMode: {
    classSuffix: ''
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
      siteUrl: 'https://blog.k1yoshi.com/',
      siteName: 'Kiyoshi\'s Blog',
      siteDescription: 'Kiyoshi\'s Blog - sharing knowledge in ' +
        'programming and all sort of things related to computer science.',
      language: 'en-US',
      titleSeparator: '|',
      giscus: {
        username: 'Kiyo5hi',
        repoName: 'blog-resources',
        repoId: 'R_kgDOI0u2OA',
        category: 'General',
        catetoryId: 'DIC_kwDOI0u2OM4CTv99'
      }
    }
  }
})
