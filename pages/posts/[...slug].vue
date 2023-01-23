<template>
  <div>
    <AppCard class="px-6 py-4">
      <article class="prose max-w-none dark:prose-invert prose-pre:shadow-md">
        <ContentDoc :head="false" />
      </article>
    </AppCard>
    <AppCard>
      Hi
    </AppCard>
  </div>
</template>

<script setup lang="ts">
const { path } = useRoute()
const { title } = useAppConfig()
const { title: postTitle } = (await queryContent(path).findOne())

useHead({
  title: `${postTitle} | ${title}`
})
</script>
