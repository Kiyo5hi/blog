<template>
  <AppCard
    class="flex items-center gap-4 p-4"
    :class="{
      'flex-row': !isVertical,
      'flex-col': isVertical,
      'text-center': isVertical
    }"
  >
    <img
      class="h-24 w-24 object-fit rounded-full"
      :src="avatar || `https://ui-avatars.com/api/?name=${encodeURI(name)}`"
      :alt="`${name}'s profile picture'`"
    >
    <div class="flex-1 h-full w-full">
      <div class="text-lg font-bold">
        {{ name }}
      </div>

      <div v-if="description" class="text-slate-400">
        {{ description }}
      </div>

      <slot />
    </div>
  </AppCard>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    name: string,
    avatar?: string,
    description?: string
    isVertical?: boolean
}>(), {
  description: undefined,
  isVertical: false,
  avatar: undefined
})
</script>
