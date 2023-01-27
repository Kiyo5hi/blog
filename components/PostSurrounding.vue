<template>
  <div class="flex flex-row justify-between text-slate-400">
    <div>
      <NuxtLink v-if="prev" :to="prev._path" class="flex flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span>
          {{ prev.title }}
        </span>
      </NuxtLink>
    </div>
    <div>
      <NuxtLink v-if="next" :to="next._path" class="flex flex-row">
        <span>
          {{ next.title }}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

defineProps<{
    prev: Pick<ParsedContent, string> | null
    next: Pick<ParsedContent, string> | null
}>()
</script>
