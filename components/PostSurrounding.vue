<template>
  <div class="flex flex-row justify-between text-slate-400 gap-3">
    <div class="flex-1 my-auto">
      <NuxtLink v-if="prev" :to="prev._path" class="flex flex-row justify-start">
        <ChevronLeftIcon class="w-6 h-6 my-auto" />
        <div class="text-left w-5/6">
          {{ prev.title }}
        </div>
      </NuxtLink>
    </div>
    <div class="flex-1 my-auto">
      <NuxtLink v-if="next" :to="next._path" class="flex flex-row justify-end align-middle">
        <div class="text-right w-4/5">
          {{ next.title }}
        </div>
        <ChevronRightIcon class="w-6 h-6 my-auto" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

defineProps<{
    prev: Pick<ParsedContent, string> | null
    next: Pick<ParsedContent, string> | null
}>()
</script>
