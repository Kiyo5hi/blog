<template>
  <ContentList
    :query="{
      only: ['title', 'description', '_path'],
    }"
  >
    <template #default="{ list }">
      <ul class="w-full">
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
            <NuxtLink :to="article._path" class="flex flex-row justify-end">
              <AppButton class="text-blue-500 p-1">
                Read more...
              </AppButton>
            </NuxtLink>
          </AppCard>
        </li>
      </ul>
    </template>

    <template #not-found>
      <div>Nothing is yet posted! Maybe check back later?</div>
    </template>
  </ContentList>
</template>
