<template>
  <div class="flex flex-col gap-4">
    <AppCard class="px-6 py-4">
      <article class="prose max-w-none dark:prose-invert prose-pre:shadow-md">
        <ContentDoc v-slot="{ doc }" :head="false">
          <h1>{{ doc.title }}</h1>
          <p class="text-slate-400 flex flex-row gap-2">
            <span>{{ formatDate(doc.createdAt) }}</span>
            <span>|</span>
            <span>{{ doc.category }}</span>
          </p>
          <p> {{ doc.description }}</p>
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
const { path } = useRoute()

const { description } = await queryContent('/posts')
  .where({ _path: path })
  .findOne()

const [prev, next] = await queryContent('/posts')
  .only(['title', '_path'])
  .sort({ createdAt: -1 })
  .findSurround(path)

function formatDate (date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  meta: [{
    name: 'description',
    content: description
  }]
})
</script>
