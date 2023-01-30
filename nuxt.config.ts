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
        'vue-html'
      ]
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
      siteUrl: 'https://blog.k1yoshi.com/',
      siteName: 'Kiyoshi\'s Blog',
      siteDescription: 'Kiyoshi\'s Blog - sharing knowledge in ' +
      'programming and all sort of things related to computer science.',
      language: 'en-US',
      titleSeparator: '|',
      giscus: {
        username: 'Kiyo5hi',
        repoName: 'blog-comments',
        repoId: 'R_kgDOI0u2OA',
        category: 'General',
        catetoryId: 'DIC_kwDOI0u2OM4CTv99'
      }
    }
  }
})
