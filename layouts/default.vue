<template>
  <div class="min-h-screen bg-slate-200 dark:bg-slate-900 dark:text-white">
    <AppHeader class="bg-white dark:bg-slate-800 bg-opacity-80 shadow-md" />
    <div class="p-4">
      <slot />
    </div>
    <AppFooter class="bg-white dark:bg-slate-800 bg-opacity-80 shadow-md" />
  </div>
</template>
