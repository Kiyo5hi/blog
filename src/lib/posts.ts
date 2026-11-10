import { execFileSync } from 'node:child_process'
import { getCollection } from 'astro:content'

export async function getPosts() {
  // Never silently replace historical publication dates with the build date.
  if (execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim() === 'true') {
    throw new Error('Post dates require full Git history. Fetch with --unshallow before building.')
  }
  const entries = await getCollection('posts')
  return entries.map(entry => {
    const dates = execFileSync('git', ['log', '--follow', '--format=%aI', '--', entry.filePath!], {
      encoding: 'utf8'
    }).trim().split('\n').filter(Boolean)
    const createdAt = entry.data.createdAt ?? dates.at(-1)
    const updatedAt = entry.data.updatedAt ?? dates[0] ?? createdAt
    if (!createdAt || !updatedAt) {
      throw new Error(`${entry.id}: commit the post or set createdAt in its frontmatter.`)
    }
    return { ...entry, path: `/posts/${entry.id}`, createdAt, updatedAt }
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'America/Los_Angeles'
  })
}
