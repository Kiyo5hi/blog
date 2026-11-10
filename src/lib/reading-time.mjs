import readingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export function remarkReadingTime() {
  return (tree, file) => {
    file.data.astro.frontmatter.readingTime = readingTime(toString(tree))
  }
}
