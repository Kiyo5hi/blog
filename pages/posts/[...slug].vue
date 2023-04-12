<template>
  <div class="flex flex-col gap-4">
    <AppCard class="px-6 py-4">
      <article class="prose max-w-none dark:prose-invert prose-pre:shadow-md">
        <ContentDoc v-slot="{ doc }: { doc: ParsedContent }" :head="false">
          <h1>{{ doc.title }}</h1>
          <p class="text-slate-400 flex flex-row gap-2">
            <span>{{ formatDate(doc.createdAt) }}</span>
            <span>|</span>
            <span>{{ doc.category }}</span>
            <span>|</span>
            <span>{{ doc.readingTime.text }}</span>
          </p>
          <p> {{ doc.excerpt }}</p>
          <ContentRenderer :value="doc" />
        </ContentDoc>
      </article>
    </AppCard>
    <PostSurrounding :prev="prev" :next="next" />
    <AppCard class="px-6 py-4">
      <CommentWidget />
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

const { path } = useRoute()

const { title, excerpt } = await queryContent('/posts')
  .where({ _path: path })
  .findOne()

const [prev, next] = await queryContent('/posts')
  .only(['title', '_path'])
  .sort({ createdAt: -1 })
  .findSurround(path)

function formatDate (date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'America/Los_Angeles'
  })
}

useHead({
  title,
  meta: [{
    name: 'title',
    content: title
  }, {
    name: 'description',
    content: excerpt
  }]
})
</script>
