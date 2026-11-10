// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.?([cm])[jt]s?(x)', '**/*.vue'],
  rules: {
    // Carry over the standard style of the former @nuxtjs/eslint-config-typescript
    '@stylistic/space-before-function-paren': ['error', 'always'],
    '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'vue/max-attributes-per-line': 'off',
    'nuxt/nuxt-config-keys-order': 'off',
    '@stylistic/eol-last': 'error',
    '@stylistic/max-len': ['error', 120]
  }
})
