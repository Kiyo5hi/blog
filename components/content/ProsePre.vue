<template>
  <div class="relative">
    <span
      v-if="language"
      class="uppercase absolute top-0 right-2 opacity-50"
    >
      {{ language }}
    </span>
    <pre :class="$props.class" v-bind="$attrs"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

withDefaults(
  defineProps<{
    code?: string
    language?: string | null
    filename?: string | null
    highlights?: number[]
    meta?: string | null
    class?: string | null
  }>(), {
    code: '',
    language: null,
    filename: null,
    highlights: () => [],
    meta: null,
    class: null
  }
)
</script>
