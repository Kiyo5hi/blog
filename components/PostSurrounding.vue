<template>
  <div class="flex flex-row justify-between text-slate-400">
    <div>
      <NuxtLink v-if="prev" :to="prev._path" class="flex flex-row">
        <ChevronLeftIcon class="w-6 h-6" />
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
        <ChevronRightIcon class="w-6 h-6" />
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
