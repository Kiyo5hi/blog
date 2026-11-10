import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>> {
  content: ['./src/**/*.{astro,ts}'],
  darkMode: 'class',
  plugins: [
    typography
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d62000'
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-pre-bg': '#f3f4f6'
          }
        }
      }
    }
  }
}
