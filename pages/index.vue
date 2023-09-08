<template>
  <ContentList
    path="/posts"
    :query="query"
  >
    <template
      #default="{ list: posts }: {list: Array<ParsedContent>}"
    >
      <div class="flex flex-col gap-4">
        <AppCard v-for="post in posts" :key="post._path" class="p-4">
          <div class="text-2xl mb-2">
            <NuxtLink :to="post._path">
              {{ post.title }}
            </NuxtLink>
          </div>
          <div class="text-slate-400">
            {{ post.description }}
          </div>
          <div class="flex flex-row justify-end">
            <NuxtLink :to="post._path">
              <AppButton class="text-blue-500 py-1 px-2" highlight scale>
                Read more...
              </AppButton>
            </NuxtLink>
          </div>
        </AppCard>
        <UserProfile :name="name" :avatar="avatar" is-vertical>
          <div class="mx-auto mt-4 flex flex-row gap-2 items-center justify-center">
            <div class="w-24">
              <div>Posts</div>
              <div>{{ posts.length }}</div>
            </div>
            <div class="w-24">
              <div>Categories</div>
              <div>
                {{ (new Set(posts.map(({category}) => category))).size }}
              </div>
            </div>
          </div>
        </UserProfile>
      </div>
    </template>

    <template #not-found>
      <div>Nothing is yet posted! Maybe check back later?</div>
    </template>
  </ContentList>
</template>

<script setup lang="ts">
import type { ParsedContent, QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

const query: QueryBuilderParams = {
  only: ['title', 'description', '_path', 'category'],
  sort: [{ createdAt: -1 }]
}

const { name, avatar } = useRuntimeConfig().public.profile

definePageMeta({
  title: 'Home'
})
</script>
