<template>
  <div
    class="flex flex-col md:flex-row items-center gap-3 justify-between px-16 pt-8 pb-16
  text-slate-800 dark:text-slate-400"
  >
    <span>
      <span>Copyright © 2022 - {{ year }}&nbsp;</span>
      <NuxtLink
        class="text-black dark:text-white"
        :to="config.url"
      >
        {{ config.title }}
      </NuxtLink>
    </span>
    <span>
      <span>Powered by</span>
      <NuxtLink
        class="text-black dark:text-white"
        to="nuxt.com"
      >
        Nuxt.js
      </NuxtLink>
      <span>• Designed by</span>
      <NuxtLink
        to="k1yosih.com"
        class="text-black dark:text-white"
      >
        Kiyoshi
      </NuxtLink>
    </span>
  </div>
</template>

<script setup lang=ts>
const year = new Date().getFullYear()
const config = useAppConfig()
</script>
