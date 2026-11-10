<template>
  <div class="flex flex-row justify-between text-slate-400 gap-3">
    <div class="flex-1 my-auto">
      <NuxtLink v-if="prev" :to="prev.path" class="flex flex-row justify-start">
        <ChevronLeftIcon class="w-6 h-6 my-auto" />
        <div class="text-left w-5/6">
          {{ prev.title }}
        </div>
      </NuxtLink>
    </div>
    <div class="flex-1 my-auto">
      <NuxtLink v-if="next" :to="next.path" class="flex flex-row justify-end align-middle">
        <div class="text-right w-4/5">
          {{ next.title }}
        </div>
        <ChevronRightIcon class="w-6 h-6 my-auto" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

defineProps<{
  prev: ContentNavigationItem | null
  next: ContentNavigationItem | null
}>()
</script>
