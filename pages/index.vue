<template>
  <ContentList
    path="/posts"
    :query="query"
  >
    <template
      #default="{ list }: {list: Array<{
      title: string
      _path: string
      description: string
      category: string
      }>}"
    >
      <div class="flex flex-col gap-4">
        <AppCard v-for="article in list" :key="article._path" class="p-4">
          <div class="text-2xl mb-2">
            <NuxtLink :to="article._path">
              {{ article.title }}
            </NuxtLink>
          </div>
          <div class="text-slate-400">
            {{ article.description }}
          </div>
          <div class="flex flex-row justify-end">
            <NuxtLink :to="article._path">
              <AppButton class="text-blue-500 py-1 px-2" highlight scale>
                Read more...
              </AppButton>
            </NuxtLink>
          </div>
        </AppCard>
        <UserProfile :name="name" :avatar="avatar" is-vertical>
          <div class="max-w-sm mx-auto flex flex-row gap-4 items-center justify-evenly">
            <div>
              <div>Articles</div>
              <div>{{ list.length }}</div>
            </div>
            <div>
              <div>Categories</div>
              <div>
                {{ (new Set(list.map(({category}) => category))).size }}
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
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

const query: QueryBuilderParams = {
  only: ['title', 'description', '_path', 'category'],
  sort: [{ createdAt: -1 }]
}

const { name, avatar } = useRuntimeConfig().public.profile

definePageMeta({
  title: 'Home'
})
</script>
