<template>
  <div
    class="rounded-lg transition"
    :class="{
      'hover:bg-gray-200': highlight,
      'dark:hover:bg-slate-700': highlight,
      'hover:scale-105': scale
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  highlight?: boolean
  scale?: boolean
}>(), {
  highlight: false,
  scale: false
})
</script>
