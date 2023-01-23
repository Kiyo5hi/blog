<template>
  <Giscus
    :repo="`${giscus.username}/${giscus.repoName}`"
    :repo-id="giscus.repoId"
    :category="giscus.category"
    :category-id="giscus.catetoryId"
    mapping="pathname"
    strict="0"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    theme="preferred_color_scheme"
    lang="en"
    loading="lazy"
    crossorigin="anonymous"
  />
</template>

<script setup lang="ts">
import Giscus from '@giscus/vue'

const { giscus } = useAppConfig()
</script>
