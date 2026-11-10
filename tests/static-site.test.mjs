import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'
import { parse } from 'parse5'

const html = path => readFileSync(`dist/${path}`, 'utf8')
const attr = (node, key) => node.attrs?.find(a => a.name === key)?.value
const all = (node, match) => [
  ...(match(node) ? [node] : []), ...(node.childNodes ?? []).flatMap(child => all(child, match))
]
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('')
const posts = readdirSync('content/posts').filter(name => name.endsWith('.md')).map(name => name.slice(0, -3))
const historicalDates = {
  'a-quick-peek-into-pytorch': '4/6/2023',
  'how-do-i-manage-my-dev-env': '1/31/2023',
  'theory-of-computation': '1/26/2023',
  sample: '1/15/2023'
}

test('all public routes have canonical metadata and no framework hydration payload', () => {
  for (const route of ['/', '/friends', ...posts.map(id => `/posts/${id}`)]) {
    const source = html(route === '/' ? 'index.html' : `${route.slice(1)}.html`)
    const tree = parse(source)
    assert.equal(attr(all(tree, n => n.tagName === 'link' && attr(n, 'rel') === 'canonical')[0], 'href'), `https://blog.kiyo5hi.com${route}`)
    assert.ok(text(all(tree, n => n.tagName === 'title')[0]).endsWith(" | Kiyoshi's Blog"))
    assert.ok(attr(all(tree, n => n.tagName === 'meta' && attr(n, 'name') === 'description')[0], 'content'))
    assert.doesNotMatch(source, /__NUXT__|__NUXT_DATA__|astro-island|\/_nuxt\//)
    const scripts = all(tree, n => n.tagName === 'script')
    for (const script of scripts) {
      if (attr(script, 'src')) assert.equal(attr(script, 'src'), 'https://giscus.app/client.js')
    }
  }
})

for (const id of posts) {
  test(`${id}: preserved code, historical date and discussion identity`, () => {
    const source = html(`posts/${id}.html`)
    const tree = parse(source)
    if (historicalDates[id]) assert.equal(text(all(tree, n => n.tagName === 'time')[0]), historicalDates[id])
    const markdown = readFileSync(`content/posts/${id}.md`, 'utf8')
    const fences = [...markdown.matchAll(/^```[^\n]*\n([\s\S]*?)^```/gm)].map(m => m[1].trimEnd())
    const rendered = all(tree, n => n.tagName === 'pre').map(n => text(n).trimEnd())
    assert.deepEqual(rendered, fences, 'code must survive Markdown/highlighter migration verbatim')
    const comments = all(tree, n => n.tagName === 'script' && attr(n, 'src') === 'https://giscus.app/client.js')
    assert.equal(comments.length, 1)
    assert.equal(attr(comments[0], 'data-mapping'), 'pathname')
    assert.equal(attr(comments[0], 'data-repo-id'), 'R_kgDOI0u2OA')
    assert.equal(attr(comments[0], 'data-category-id'), 'DIC_kwDOI0u2OM4CTv99')
    const schema = JSON.parse(text(all(tree, n => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json')[0]))
    assert.equal(schema['@type'], 'BlogPosting')
    assert.equal(schema.mainEntityOfPage, `https://blog.kiyo5hi.com/posts/${id}`)
    const ids = new Set(all(tree, n => attr(n, 'id')).map(n => attr(n, 'id')))
    if (id === 'how-do-i-manage-my-dev-env') assert.ok(ids.has('bonus-code-server-and-jupyter'))
    for (const link of all(tree, n => n.tagName === 'a' && attr(n, 'href')?.startsWith('#'))) {
      assert.ok(ids.has(decodeURIComponent(attr(link, 'href').slice(1))), `missing fragment ${attr(link, 'href')}`)
    }
  })
}

test('all math renders and KaTeX assets are local', () => {
  const tree = parse(html('posts/theory-of-computation.html'))
  assert.equal(all(tree, n => attr(n, 'class')?.split(' ').includes('katex')).length, 117)
  assert.equal(all(tree, n => attr(n, 'class')?.split(' ').includes('katex-error')).length, 0)
  for (const link of all(tree, n => n.tagName === 'link' && attr(n, 'rel') === 'stylesheet')) {
    assert.ok(attr(link, 'href').startsWith('/_astro/'))
  }
  assert.ok(readdirSync('dist/_astro').some(name => name.endsWith('.woff2')))
})

test('sitemap, crawl policy, friends and 404 remain static', () => {
  const sitemap = html('sitemap.xml')
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname).sort()
  assert.deepEqual(paths, ['/', '/friends', ...posts.map(id => `/posts/${id}`)].sort())
  assert.match(html('robots.txt'), /Sitemap: https:\/\/blog\.kiyo5hi\.com\/sitemap.xml/)
  assert.match(html('404.html'), /404 Absolutely Nothing Found/)
  assert.match(html('404.html'), /name="robots" content="noindex"/)
  assert.match(html('friends.html'), /https:\/\/lu.math.uci.edu/)
  assert.match(html('friends.html'), /https:\/\/praxxus11.github.io/)
})
