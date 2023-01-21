<template>
  <div class="flex flex-row items-center">
    <span v-for="(item, index) in navItems" :key="item.name">
      <StyledLink :to="item.url">
        {{ item.name }}
      </StyledLink>
      <span v-if="index + 1 < navItems.length" class="mx-1">|</span>
    </span>
  </div>
</template>

<script setup lang="ts">
const navItems = [{
  name: 'Home',
  url: '/'
}, {
  name: 'My Love',
  url: 'https://acey.k1yoshi.com'
}, {
  name: 'Friends',
  url: '/friends'
}, {
  name: 'About',
  url: 'https://k1yoshi.com'
}]
</script>
