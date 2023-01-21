<template>
  <div
    class="bg-white dark:bg-slate-800 shadow-md rounded-lg transition"
    :class="{
      'hover:bg-gray-200': highlight,
      'dark:hover:bg-slate-700': highlight,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  highlight?: boolean
}>(), {
  highlight: false
})
</script>
