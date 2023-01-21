/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography')
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
