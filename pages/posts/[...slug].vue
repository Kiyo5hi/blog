<template>
  <div class="flex flex-col gap-4">
    <AppCard class="px-6 py-4">
      <article v-if="post" class="prose max-w-none dark:prose-invert prose-pre:shadow-md">
        <h1>{{ post.title }}</h1>
        <p class="text-slate-400 flex flex-row gap-2">
          <span>{{ formatDate(post.createdAt) }}</span>
          <span>|</span>
          <span>{{ post.category }}</span>
          <span>|</span>
          <span>{{ post.readingTime.text }}</span>
        </p>
        <ContentRenderer :value="post" />
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

const { data: post } = await useAsyncData(`post-${path}`, () => queryCollection('posts')
  .path(path)
  .first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

const { data: surround } = await useAsyncData(`post-surround-${path}`, () => queryCollectionItemSurroundings(
  'posts',
  path,
  { fields: ['title'] }
).order('createdAt', 'DESC'))

const prev = computed(() => surround.value?.[0] ?? null)
const next = computed(() => surround.value?.[1] ?? null)

function formatDate (date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'America/Los_Angeles'
  })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description
})
</script>
