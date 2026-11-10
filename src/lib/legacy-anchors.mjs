// Preserve the one published Nuxt fragment that differs from GitHub slugging.
// Other headings use Astro's standard IDs; article source/history stays intact.
export function rehypeLegacyAnchors() {
  return (tree, file) => {
    if (!file.path.endsWith('/how-do-i-manage-my-dev-env.md')) return
    const text = node => node.value ?? (node.children ?? []).map(text).join('')
    const walk = node => {
      if (node.tagName === 'h2' && text(node) === 'Bonus - Code Server and Jupyter') {
        node.properties.id = 'bonus-code-server-and-jupyter'
      }
      for (const child of node.children ?? []) walk(child)
    }
    walk(tree)
  }
}
