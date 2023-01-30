<template>
  <ContentList
    path="/posts"
    :query="query"
  >
    <template #default="{ list }">
      <ul class="w-full flex flex-col gap-4">
        <li v-for="article in list" :key="article._path">
          <AppCard class="p-4">
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
        </li>
      </ul>
    </template>

    <template #not-found>
      <div>Nothing is yet posted! Maybe check back later?</div>
    </template>
  </ContentList>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

const query: QueryBuilderParams = {
  limit: 5,
  only: ['title', 'description', '_path'],
  sort: [{ createdAt: -1 }]
}
</script>
