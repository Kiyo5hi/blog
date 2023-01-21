// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
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
  }
})
