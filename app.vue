<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { htmlAttrs } = useAppConfig()

useColorMode()

useHead({
  htmlAttrs
})
</script>
