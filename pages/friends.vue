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
const friends = await(await queryContent('/friends').findOne()).body

definePageMeta({
  title: 'Friends',
  description: 'List of my friends who also blog.'
})
</script>
