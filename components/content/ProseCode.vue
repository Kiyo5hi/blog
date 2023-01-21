<template>
  <div class="relative">
    <span
      v-if="language"
      class="uppercase absolute top-0 right-2 opacity-50"
    >
      {{ language }}
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    code?: string,
    language?: string | null,
    filename?: string | null,
    highlights?:() => number[],
    meta?: string | null
  }>(), {
    code: '',
    language: null,
    filename: null,
    highlights: () => [],
    meta: null
  }
)
</script>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
