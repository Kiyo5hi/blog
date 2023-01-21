<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div v-for="friend in friends" :key="friend.name" class="col-span-1 h-32">
      <NuxtLink :to="friend.uri">
        <AppCard
          class="flex flex-row items-center gap-4 p-4 w-full h-full"
          highlight
        >
          <img
            class="h-24 w-24 object-fit rounded-full"
            :src="friend.profileImage"
            :alt="`${friend.name}'s profile picture'`"
          >
          <div class="flex-1 h-full">
            <div class="text-lg font-bold">
              {{ friend.name }}
            </div>
            <div class="text-gray-500">
              {{ friend.description }}
            </div>
          </div>
        </AppCard>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const friends = await(await queryContent('friends').findOne()).body
</script>
