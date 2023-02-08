<template>
  <div class="min-h-screen bg-slate-200 dark:bg-slate-900 dark:text-white">
    <AppHeader id="top" class="bg-white dark:bg-slate-800 bg-opacity-80 shadow-md" />
    <div class="lg:w-[1024px] mx-auto p-4">
      <slot />
    </div>
    <AppFooter class="bg-white dark:bg-slate-800 bg-opacity-80 shadow-md" />
    <AppButton class="bg-slate-200 dark:bg-slate-700 shadow-md fixed bottom-5 right-5" highlight>
      <NuxtLink to="#top">
        <ArrowUpIcon class="w-10 h-10 p-1" />
      </NuxtLink>
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpIcon } from '@heroicons/vue/24/outline'
</script>
