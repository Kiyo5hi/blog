// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Kiyoshi's Blog"
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    highlight: {
      theme: 'dark-plus',
      preload: [
        'c',
        'cpp',
        'java',
        'python'
      ]
    }
  }
})
