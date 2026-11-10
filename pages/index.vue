<template>
  <div v-if="posts?.length" class="flex flex-col gap-4">
    <AppCard v-for="post in posts" :key="post.path" class="p-4">
      <div class="text-2xl mb-2">
        <NuxtLink :to="post.path">
          {{ post.title }}
        </NuxtLink>
      </div>
      <div class="text-slate-400">
        {{ post.description }}
      </div>
      <div class="flex flex-row justify-end">
        <NuxtLink :to="post.path">
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
            {{ (new Set(posts.map(({ category }) => category))).size }}
          </div>
        </div>
      </div>
    </UserProfile>
  </div>
  <div v-else>
    Nothing is yet posted! Maybe check back later?
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () => queryCollection('posts')
  .order('createdAt', 'DESC')
  .select('title', 'description', 'path', 'category')
  .all()
)

const { name, avatar } = useRuntimeConfig().public.profile

definePageMeta({
  title: 'Home'
})
</script>
