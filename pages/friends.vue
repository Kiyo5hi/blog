<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div v-for="friend in friends" :key="friend.name" class="col-span-1 h-32">
      <NuxtLink :to="friend.url">
        <UserProfile highlight :name="friend.name" :avatar="friend.avatar" :description="friend.description" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('friends', () => queryCollection('friends').first())
const friends = computed(() => data.value?.body ?? [])

definePageMeta({
  title: 'Friends'
})

useSeoMeta({
  description: 'List of my friends who also blog.'
})
</script>
