<template>
  <div
    class="flex flex-col md:flex-row items-center gap-3 justify-around py-8
         text-slate-400 text-center"
  >
    <span>
      <span>Copyright © 2022 - {{ year }}&nbsp;</span>
      <StyledLink class="text-black dark:text-white" to="/">
        {{ siteName }}
      </StyledLink>
    </span>
    <span>
      <span>Powered by</span>
      <StyledLink class="text-black dark:text-white" to="https://nuxt.com">
        Nuxt.js
      </StyledLink>
      <span>• Designed by</span>
      <StyledLink to="https://k1yoshi.com" class="text-black dark:text-white">
        Kiyoshi
      </StyledLink>
    </span>
  </div>
</template>

<script setup lang=ts>
const year = new Date().getFullYear()
const { siteName } = useRuntimeConfig().public
</script>
